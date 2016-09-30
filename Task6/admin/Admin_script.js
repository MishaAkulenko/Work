
document.querySelector("#profile-form").onclick = parsingEvent;
document.querySelector("#profile-form").onchange = createDataObj;
var selectValues = "text";
var questions;
var values;


function parsingEvent(event) {
    if (event.target.classList.contains('add-button')) {
        var firsForm = document.querySelectorAll(".section-style-form")[1];
        var cln = firsForm.cloneNode(true);
        firsForm.parentNode.insertBefore(cln, cln.nextSibling);
        return false;
    }
	if (event.target.classList.contains('delete-button')){
		var section = event.target.parentNode;
        section.parentNode.removeChild(section);
		createDataObj ();
        return false;
    } else {
        return;  
    }  
}

function createDataObj (event) {	
	var profile = {};
	var sectionForm = document.querySelectorAll(".section-style-form");
	for (i = 0; i < sectionForm.length-1; i++) {
		var questions = document.querySelectorAll(".question-style")[i].value;
		var parameter = document.querySelectorAll(".parameter-style")[i].value;
		var values = document.querySelectorAll(".values-style")[i].value;
		var valuesArr = values.split(',');
		var select = document.querySelectorAll(".select-style")[i].value;
        var hide = document.querySelectorAll(".values-style")[i];
		if (select == "string" || select == "number" || select == "checkbox") {
            hide.hidden = true;
            hide.previousElementSibling.hidden = true;
            profile[parameter] = {
                type : select,
                question : questions     
            }   
        } else {
            hide.hidden = false;
            hide.previousElementSibling.hidden = false;
            profile[parameter] = {
                type : select,
                question : questions,
                values : valuesArr
            }
        }
	}
    console.log(profile);
    sendData(profile);
}

function sendData(profile) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:8000/", true);
    xhr.send(JSON.stringify(profile));
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          console.log(xhr.status + ':' + xhr.statusText);
        }
      }
    }
