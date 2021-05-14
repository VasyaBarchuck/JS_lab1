let tasks = [];
let status = [];

let modeDelete = false;
let spanDelete = document.getElementById("ModeDelete");
let modeEdit = false;
let spanEdit = document.getElementById("ModeEdit");

let elemSuccessful = document.getElementById("successful");
let elemTasks = document.getElementById("tasks");
let buttonClick = document.getElementById("AddNew");

let buttonClose = document.getElementById("closeInfo");
let blockInfo = document.getElementById("info");
let blockContent = document.getElementById("todo");


buttonClick.onclick = addTask;
buttonClose.onclick = closeInfo;

let classMode = "normal";

getStorage();

function add(task, st){
	if(tasks === null) tasks = [];
	tasks.push(task);
	status.push(st);
	displayTask();
}

function printArray(){
	let log = "";
	for(let i = 0; i < tasks.length; i++){
		log += "[" + i + "] " + tasks[i] + " <" + status[i] + ">\n";
	}
	console.log(log);
}


function displayTask(){
	if(tasks === null) tasks = [];
	elemSuccessful.innerHTML = "";
	elemTasks.innerHTML = "";
	for(let i = 0; i < tasks.length; i++){
		if(status[i]){
			elemSuccessful.innerHTML += struct(tasks[i], i);
		}else{
			elemTasks.innerHTML += struct(tasks[i], i);
		}
	}
}

function struct(task, number){
	let ret = "<div class=\"task\ "+ classMode + "\" onclick=\"check("+ number +")\"> \n\
	\t<a>"+ task +"</a> \n\
	\t<div class=\"img\"><span>✓</span></div> \n\
	</div>\n\n";

	return ret;
}

function check(number){
	if(!modeDelete && !modeEdit){
		if(status[number]) status[number] = false;
		else status[number] = true;
		classMode = "normal"
	}
	if(modeDelete){
		if(number != -1) removeTask(number);
		classMode = "remove";
	}

	if(modeEdit){
		if(number != -1) editTask(number);
		classMode = "edit";
	}

	localStorage.setItem("status", JSON.stringify(status));
	displayTask();
}

function addTask(){
	if(tasks === null) tasks = [];
	if(status === null) status = [];
	newTask = prompt("Enter task:");
	if(newTask == null || newTask == "") return;
	
	tasks.push(newTask);
	status.push(false);

	localStorage.setItem("tasks", JSON.stringify(tasks));
	localStorage.setItem("status", JSON.stringify(status));

	displayTask();
}


function editTask(number){
	let text = prompt("Enter task: ");
	if(confirm("Ви дійсно хочете замінити\n" + tasks[number] + "\nна\n" + text + "?")){
		tasks[number] = text;
		localStorage.setItem("tasks", JSON.stringify(tasks));
		displayTask();	
	}
}


function removeTask(number){
	if(confirm("Ви дійсно хочете видалити?")){
		tasks.splice(number, 1);
		status.splice(number, 1);

		localStorage.setItem("tasks", JSON.stringify(tasks));
		localStorage.setItem("status", JSON.stringify(status));

		displayTask();
	}
	
}


document.addEventListener('keyup', function(event) {

	if(event.code == 'ShiftLeft'){
		modeDelete = false;
		if(modeEdit) modeEdit = false;
		else modeEdit = true;
  	}
  	if(event.code == 'Delete'){
		modeEdit = false;
		if(modeDelete) modeDelete = false;
		else modeDelete = true;
  	}

  	if(modeEdit){
  		spanEdit.classList.remove("colorOff");
    	spanEdit.classList.add("colorOn");
    	spanEdit.innerHTML = "On";
  	}else{
  		spanEdit.classList.remove("colorOn");
    	spanEdit.classList.add("colorOff");
    	spanEdit.innerHTML = "Off";
  	}

  	if(modeDelete){
  		spanDelete.classList.remove("colorOff");
    	spanDelete.classList.add("colorOn");
    	spanDelete.innerHTML = "On";
  	}else{
  		spanDelete.classList.remove("colorOn");
    	spanDelete.classList.add("colorOff");
    	spanDelete.innerHTML = "Off";
  	}

  	check(-1);

});


function getStorage(){
	tasks = JSON.parse(localStorage.getItem("tasks"));
	status = JSON.parse(localStorage.getItem("status"));
	displayTask();
}

function closeInfo(){
	blockInfo.style.display = "none";
	blockContent.style.display = "block";
}
