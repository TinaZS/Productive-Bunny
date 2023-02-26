function getWeather() {
  let window = document.getElementById("window");
  window.src = "images/window.png";

  let temperature = document.getElementById("temperature");
  // let description = document.getElementById("description");
  // let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "f34b50cb362f0c89e2d43ca3b46e50cf";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° F";
        location.innerHTML = "";
        // location.innerHTML =
        //   data.name + " (" + latitude + "°, " + longitude + "°)";
        //description.innerHTML = data.weather[0].main;
        windowImage = data.weather[0].main;

        // Load image of snow if the weather description is "snow"
        if (windowImage.toLowerCase() === "snow") {
          let image = document.getElementById("weather-image");
          image.src = "images/snow.png";
        }

        // Load image of rain if the weather description is "rain"
        else if (
          windowImage.toLowerCase() === "rain" ||
          data.weather[0].main.toLowerCase() === "thunderstorm" ||
          data.weather[0].main.toLowerCase() === "drizzle"
        ) {
          let image = document.getElementById("weather-image");
          image.src = "images/rain.png";
        }
        // Load image of sun if the weather description is "clear"
        else if (windowImage.toLowerCase() === "clear") {
          let image = document.getElementById("weather-image");
          image.src = "images/sun.png";
        }

        // Load image of could if the weather description is "clouds"
        else if (windowImage.toLowerCase() === "clouds") {
          let image = document.getElementById("weather-image");
          image.src = "images/clouds.png";
        }
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();

/* 
  This section is the code for to-do-list functions
*/

var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List item

var createNewTaskElement = function (taskString) {
  // create List Item
  var listItem = document.createElement("li");
  // input checkbox
  var checkBox = document.createElement("input");
  // label
  var label = document.createElement("label");
  // input (text)
  var editInput = document.createElement("input");
  // button.edit
  var editButton = document.createElement("button");
  // button.delete
  var deleteButton = document.createElement("button");

  //Each element needs modified

  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//Add a new task
var addTask = function () {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

//Edit an existing task
var editTask = function () {
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

  // if class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the labels text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
};

//Delete an existing task
var deleteTask = function () {
  console.log("Delete Task...");
  //Remove the parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

//Mark a task as complete
var taskCompleted = function () {
  console.log("Task Complete...");
  //When the Checkbox is checked
  //Append the task list item to the #completed-tasks ul
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function () {
  console.log("Task Incomplete...");
  //When the checkbox is unchecked appendTo #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind List item events");
  // select listitems chidlren
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

let seconds = document.querySelector(".seconds");
let minutes = document.querySelector(".minutes");
let indicator = document.querySelector(".indicator");

let play = document.querySelector(".fa-play");
let pause = document.querySelector(".fa-pause");
let stop = document.querySelector(".fa-stop");
let counter = -1;
let pomoValue = 25 * 60;
let counterValue = pomoValue;
// let restValue = 300000;
play.addEventListener("click", () => {
  if (counter == -1 && counterValue > 0) {
    counter = setInterval(() => {
      let rest = --counterValue;
      let min = Math.floor(rest / 60);
      let sec = Math.floor(rest % 60);
      seconds.textContent = sec.toString().padStart(2, "0");
      minutes.textContent = min.toString().padStart(2, "0");
      indicator.style.strokeDashoffset = 600 - (rest / pomoValue) * 600;

      if (rest == 0) {
        clearInterval(counter);
      }
      console.log(min, sec, rest);
    }, 1000);
  }
});
pause.addEventListener("click", () => {
  clearInterval(counter);
  counter = -1;
});
stop.addEventListener("click", () => {
  clearInterval(counter);
  counter = -1;
  counterValue = pomoValue;
  let min = Math.floor(counterValue / 60);
  let sec = Math.floor(counterValue % 60);
  seconds.textContent = sec.toString().padStart(2, "0");
  minutes.textContent = min.toString().padStart(2, "0");
  indicator.style.strokeDashoffset = 600 - (counterValue / pomoValue) * 600;
});
