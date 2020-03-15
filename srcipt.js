let id = 0;
let replying=false

$(document).ready(function(){
		$('#addComment').on('click',AddComment);
	});
function AddComment (){
	id++;
	let name = $("#inputName").val();
	let subject = $("#inputSubject").val();
	let comment = $("#inputComment").val();
	let color = $("input[name='inputcolor']:checked").val();
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
				<a href="#" class="replyBtn" onclick="AddReplyForm()">Reply</a>
			</div>
		</li>
	</ul>`;
	$("#commentList").append(newComment);
	let date = new Date();
	$("form")[0].reset();
}

function RenderComment(replyID){
	let name = $("#inputName-1").val();
	let subject = $("#inputSubject-1").val();
	let comment = $("#inputComment-1").val();
	let color = $("input[name='inputcolor']:checked").val();
	let newComment =  `
	<ul id="comments-${id}" class="list-unstyled mt-3">
		<li class="media">
			<svg height="100" width="100">
			<circle cx="50" cy="50" r="40" fill="${color}">
		</svg>
			<div class="media-body" id="media-Body-${id}">
				<h5 >${subject}</h5>
			<h6 >${name}</h6>
				<p >${comment}</p>
				<a href="#" class="replyBtn" onclick="AddReplyForm()">Reply</a>
			</div>
		</li>
	</ul>`;
	$("#"+replyID).append(newComment);
	let date = new Date();
	$("form")[0].reset();
clearForm();
}

function AddReplyForm(){
	replying = false;
	id++;
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
		var replyid = button.parent().attr("id")
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
