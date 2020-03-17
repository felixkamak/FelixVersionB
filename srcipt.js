var id = 0;
let replying=false;
  var get_ip;
	let userLocate = "";
$(document).ready(function(){
getID();
getLocation();
getIP();
		$('#addComment').on('click',AddComment);
LoadComment();
});
function AddComment (){
	id++;
	let name = $("#inputName").val();
	let subject = $("#inputSubject").val();
	let comment = $("#inputComment").val();
	let color = $("input[name='inputcolor']:checked").val();
	let newDate = new Date();
	let $OS = getOS();
	let newComment =  `
	<ul id="comments-${id}" class="list-unstyled mt-3">
		<li class="media">
			<svg height="100" width="100">
			<circle cx="50" cy="50" r="40" fill="${color}">
		</svg>
			<div class="media-body" id="media-Body-${id}">
				<h5 >${subject}</h5>
			<h6>${name}</h6>
				<p >${comment}</p>
				<div id="comment-info-${id}">
				<p class="comment-info">sent in ${userLocate} via ${getBrowser()} using ${$OS} about at ${newDate}</p>
				<p class="comment-info">User's IP: ${get_ip}</p>
				<a href="#" class="replyBtn" onclick="AddReplyForm()">Reply</a>
				</div>

			</div>
		</li>
	</ul>`;
	$("#commentList").append(newComment);

	let date = new Date();
	$("form")[0].reset();
	SaveComment();
}

function RenderComment(replyID){
	id++;
	let name = $("#inputName-1").val();
	let subject = $("#inputSubject-1").val();
	let comment = $("#inputComment-1").val();
	let color = $("input[name='inputcolor']:checked").val();
	let newDate = new Date();
	let $OS = getOS();
	let newComment =  `
	<ul id="comments-${id}" class="list-unstyled mt-3">
		<li class="media">
			<svg height="100" width="100">
			<circle cx="50" cy="50" r="40" fill="${color}">
		</svg>
			<div class="media-body" id="media-Body-${id}">
				<h5 >${subject}</h5>
			<h6>${name}</h6>
				<p >${comment}</p>
				<div id="comment-info-${id}">
				<p class="comment-info">sent in ${userLocate} via ${getBrowser()} using ${$OS} about at ${newDate}</p>
				<p class="comment-info">User's IP: ${get_ip}</p>
				<a href="#" class="replyBtn" onclick="AddReplyForm()">Reply</a>
				</div>

			</div>
		</li>
	</ul>`;
	$(replyID).append(newComment);

	let date = new Date();
	$("form")[0].reset();
clearForm();
SaveComment();
}

function AddReplyForm(){
	replying = false;
	var button = $(event.target);
	let replyForm =  `
	<div id= "form-group-1"class="form-group" >
	  <form class="" action="" method="">
	    <label for="fname">Name: </label>
	    <br> <input type="text" name="" value="" id="inputName-1"> <br>
	    <label for="fname">Subject:  </label>
	    <br> <input type="text" name="" value="" id="inputSubject-1"> <br>
	    <label for="fname">Comment: </label>
	    <br> <textarea id="inputComment-1" name="name" rows="8" cols="80" ></textarea> <br>
	    <input type="radio" name="inputcolor" value="Red">Red <br>
	    <input type="radio" name="inputcolor" value="Blue"> Blue <br>
	    <input type="radio" name="inputcolor" value="Green"> Green <br>
	    <input type="radio" name="inputcolor" value="Purple"> Purple <br>
	    <input type="radio" name="inputcolor" value="Yellow"> Yellow <br>
	    <button type="button" class="btn btn-primary" id="replyComment" ">Add Comment</button>
	    <button type="button" class="btn btn-secondary ml-2" onclick="clearForm()" >Cancel</button>
	  </form>`;
		// alert(button.attr("id"));
		var replyid = button.parent();
if(!replying){
	$(replyForm).insertAfter(button);
replying=true;
}
			$("#replyComment").on("click",function(){
				RenderComment(replyid);
			});

}
function clearForm(){
	$("#form-group-1").remove();
}
function SaveComment(){

saveID();
	let comments= $('#commentArea').html();
$.ajax({
	type:'PUT',
	url:'http://127.0.0.1:8887/test.txt',
	data: comments,

});
}
function LoadComment(){
	$.ajax({
		type:'GET',
		url:'http://127.0.0.1:8887/test.txt',
		data:'text',
		success: function(comments){
			$('#commentArea').html("");
			let commentList = comments;
			$('#commentArea').append(commentList);
		}
	});
}
function saveID(){
	let $ID=" ";
	$ID+=id;
	$.ajax({
		type:'PUT',
		url:'http://127.0.0.1:8887/id.txt',
		data: $ID,
	})
}
function getID(){
	$.ajax({
		url:'http://127.0.0.1:8887/id.txt',
		success:function($ID){id=$ID[1];}
	});
}

let timeAgo = (date)=>{
	let currentDate = new Date();
	let yearDiff = currentDate.getFullYear() - date.getFullYear();

	if(yearDiff>0)
		return `${yearDiff} year${yearDiff==1? "":"s"} ago`;

	let monthDiff = currentDate.getMonth() - date.getMonth();
	if(monthDiff>0)
		return `${monthDiff} month${monthDiff == 1 ? "" : "s"} ago`;

	let dateDiff = currentDate.getDate() - date.getDate();
	if (dateDiff > 0)
		return `${dateDiff} day${dateDiff == 1 ? "" : "s"} ago`;

	let hourDiff = currentDate.getHours() - date.getHours();
	if (hourDiff > 0)
		return `${hourDiff} hour${hourDiff == 1 ? "" : "s"} ago`;

	let minuteDiff = currentDate.getMinutes() - date.getMinutes();
	if (minuteDiff > 0)
		return `${minuteDiff} minute${minuteDiff == 1 ? "" : "s"} ago`;
	return `a few seconds ago`;
}
 function getIP() {
	 $.ajax('http://ip-api.com/json')
 .then(
		 function success(response) {
				 console.log('User\'s Location Data is ', response);
				 console.log('User\'s Country', response.country);
		 },

		 function fail(data, status) {
				 console.log('Request failed.  Returned status of',
										 status);
		 }
 );
 }
// Detect Operating System
function getOS() {
  var os_name = "Unknown OS";
  if (navigator.appVersion.indexOf("Win") != -1)
    os_name = "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1)
    os_name = "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1)
    os_name = "Unix";
  if (navigator.appVersion.indexOf("Linux") != -1)
    os_name = "Linux";

  return os_name;
}
function getBrowser() {
  var browser = "Others";
  if (navigator.userAgent.indexOf("Chrome") != -1)
    browser = "Google Chrome";
  else if (navigator.userAgent.indexOf("Firefox") != -1)
    browser = "Mozilla Firefox";
  else if (navigator.userAgent.indexOf("MSIE") != -1)
    browser = "Internet Exploder";
  else if (navigator.userAgent.indexOf("Edge") != -1)
    browser = "Internet Exploder";
  else if (navigator.userAgent.indexOf("Safari") != -1)
    browser = "Safari";
  else if (navigator.userAgent.indexOf("Opera") != -1)
    browser = "Opera";
  else
    browser = "Others";

  return browser;
}
function getIP(){
  $.getJSON("https://api.ipify.org/?format=json", function(e) {
    get_ip = e.ip;
});
}
function getLocation() {
	$.ajax({
		url:'http://ip-api.com/json',
		success: function(response){
			userLocate = response.country;
		}
	});
}
