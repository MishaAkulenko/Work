
var profile = {
            name: {type: 'string', question: 'What is yor name?'},
            age: {type: 'number', question: 'How old are you?'},
            marital: {type: 'radio', values: ['married', 'widowed', 'single'], question: 'What is your marital status?'},
            isStudent: {type: 'checkbox', question: 'Are you student?'},
            income: {type: 'select', question: 'How much do you earn?', values: ['Nothing', '$50 - $100', '$100 - $500', '$500 - $1000', 'More then $1000']},//объект с данными пользователя который пришел с сервера                                      
}

var sectionFormCount = 0;//в этой переменной хранится занчение количетсва создаваемых форм анкеты, для пары: вопрос, поле для ввода
var countOfOption = 0;//номер пункта внутри тега select

for(key in profile){                 //перебор всех свойств объкта profile
    for(value in profile[key])       // в переменную key записываются имена свойств объекта profile (это тоже объекты), а в переменную value имена свойств объектов key
        creatingForms(key , value , sectionFormCount);  //после того как перебрали все свойства объекта запускаем функцию создания анкеты 
}

function creatingForms(key , value , sectionFormCount){ 
    var objAttr = profile[key][value];//значение свойств объектов записанных в переменную key
    var valuesArr = profile[key].values;//значение свойств объектов записанных в переменную key у которых имя "values"
    switch (objAttr){
        case "string" : createTextInput (objAttr , valuesArr, sectionFormCount);
            break;
        case "number" : createTextInput (objAttr , valuesArr, sectionFormCount);
            break;
        case "radio" : createRadio (objAttr , valuesArr, sectionFormCount);
            break;
        case "checkbox" : createCheckbox (objAttr , valuesArr, sectionFormCount);
            break;
        case "select" : createSelect (objAttr , valuesArr, sectionFormCount);
            break;
    }
}
  
function createSectionForm () {
    var sectionFormElement = document.createElement("form"); //создаем форму в которой будут находится наш вопрос и поле с ответом
    sectionFormElement.setAttribute('class' , "section-style-form");//уставливаем класс для формы
    document.querySelector("#profile-form").appendChild(sectionFormElement);//добавляем форму на страницу
    document.querySelectorAll(".section-style-form")[sectionFormCount].setAttribute("data" , "0");//добавляем форму на страницу
    sectionFormCount++;// увеличиваем счетчик количества созданных форм
    
}

function createTextInput (objAttr , valuesArr, sectionFormCount) { //создаем елементы типа input text
     createSectionForm ();
     var sectionElements = document.querySelectorAll(".section-style-form")[sectionFormCount];
     var questionElement = document.createElement("p"); //созадем елемент - параграф, в него будут записыватся вопросы из анкеты
     questionElement.setAttribute('class' , "question-style"); //устанавливаем класс для елемента с вопросом
     questionElement.innerHTML = profile[key].question; // записываем в созданный параграф вопрос из объекта profile
     var textElement = document.createElement("input");//создаем елемент типа input 
     textElement.setAttribute('type' , "text");// устанавливаем тип нашего елемента, в objAttr хранится значение свойства type из объекта profile
     textElement.setAttribute('class' , "text-style");//устанавливаем стиль для input 
     sectionElements.appendChild(questionElement);
     sectionElements.appendChild(textElement);
     textElement.parentNode.setAttribute('data-key' , key);//устанавливаем дата атрибут для материнской формы в которую записываем значение текущего key 
}

function createRadio (objAttr , valuesArr, sectionFormCount) {
    createSectionForm ();
    var sectionElements = document.querySelectorAll(".section-style-form")[sectionFormCount];
    var list = "Radio" + sectionFormCount;
    var questionElement = document.createElement("p"); //созадем елемент - параграф, в него будут записыватся вопросы из анкеты
    questionElement.setAttribute('class' , "question-style"); //устанавливаем класс для елемента с вопросом
    if (valuesArr !== undefined){
        sectionElements.appendChild(questionElement);
        questionElement.innerHTML = profile[key].question;
        for (i = 0; i < valuesArr.length; i++){
            var listElement = document.createElement("p");
            listElement.setAttribute('class' , "list-style");
            var inputElement = document.createElement("input");
            inputElement.setAttribute('class' , "radio-style");
            inputElement.setAttribute('name' , list);
            inputElement.setAttribute('type' , "radio");
            sectionElements.appendChild(listElement);
            sectionElements.appendChild(inputElement);
            inputElement.parentNode.setAttribute("data-key", key);
            listElement.innerText = valuesArr[i];
        } 
    }  
}

function createCheckbox (objAttr , valuesArr, sectionFormCount) { //создаем елементы типа input text
     createSectionForm ();
     var sectionElements = document.querySelectorAll(".section-style-form")[sectionFormCount];//форма секции
     var questionElement = document.createElement("p"); //созадем елемент - параграф, в него будут записыватся вопросы из анкеты
     questionElement.setAttribute('class' , "question-style"); //устанавливаем класс для елемента с вопросом
     questionElement.innerHTML = profile[key].question; // записываем в созданный параграф вопрос из объекта profile
     var textElement = document.createElement("input");//создаем елемент типа input 
     textElement.setAttribute('type' , "checkbox");// устанавливаем тип нашего елемента, в objAttr хранится значение свойства type из объекта profile
     textElement.setAttribute('class' , "checkbox-style");//устанавливаем стиль для input 
     textElement.setAttribute('data' , "not");//устанавливаем дата атрибут для input 
     sectionElements.appendChild(questionElement);
     sectionElements.appendChild(textElement);
     textElement.parentNode.setAttribute('data-key' , key);//устанавливаем дата атрибут для input
}

function createSelect (objAttr , valuesArr, sectionFormCount){
    createSectionForm ();
    var sectionElements = document.querySelectorAll(".section-style-form")[sectionFormCount];
    var questionElement = document.createElement("p");
    questionElement.setAttribute('class' , "question-style");
    questionElement.innerHTML = profile[key].question;
    sectionElements.appendChild(questionElement);
    if (valuesArr !== undefined){
        var selectElement = document.createElement("select");
        selectElement.setAttribute('class' , "select-style");
        for (i = 0; i < valuesArr.length; i++){
            var optionElement = document.createElement("option");
            optionElement.innerHTML = valuesArr[i];
            sectionElements.appendChild(selectElement);
            var selectElem = document.getElementsByClassName("select-style")[countOfOption];
            selectElem.appendChild(optionElement);
            selectElem.parentNode.setAttribute("data-key" , key);
        } 
    countOfOption++;
    }
}

for(key in profile){
    var sectionElements = document.querySelectorAll(".section-style-form");
}
if (sectionElements.length == sectionFormCount){ // если максимальное количество форм достигло счетчика последней созданной формы
    createSendButton (); // то создаем кнопку отправить данные на сервер
}

function createSendButton () {
    var sendElement = document.createElement("input");
    sendElement.setAttribute('type' , "button");
    sendElement.setAttribute('value' , "Send");
    sendElement.setAttribute('class' , "send-button");
    document.querySelector("#profile-form").appendChild(sendElement);
    document.querySelector(".send-button").onclick = chekFilled;
}

function chekFilled  () {
    var isFilled = true;//если falce то будет предупреждение, что не все формы заполнены
    
    var selectElements = document.querySelectorAll(".select-style");
    for (i = 0; i < selectElements.length; i++){
        var selectValues = document.querySelectorAll(".select-style")[i].value;
        document.querySelectorAll(".select-style")[i].parentNode.setAttribute('data' , selectValues);
    }
    
    var textElements = document.querySelectorAll(".text-style");
    for (i = 0; i < textElements.length; i++){
        var textValue = document.querySelectorAll(".text-style")[i].value;
        document.querySelectorAll(".text-style")[i].parentNode.setAttribute('data' , textValue); 
    }
    
    var checkboxElements = document.querySelectorAll(".checkbox-style");
    for (i = 0; i < checkboxElements.length; i++){
        if (checkboxElements[i].checked){
            checkboxElements[i].parentNode.setAttribute('data' , "yes");
        } else { 
            checkboxElements[i].parentNode.setAttribute('data' , "not");
        } 
    }
    
    var radioValues = document.querySelectorAll(".radio-style");
    for (i = 0; i < radioValues.length; i++){
        if (radioValues[i].checked){
            var listValue = document.querySelectorAll(".list-style")[i].innerHTML;
            radioValues[i].parentElement.setAttribute('data' , listValue );
        } 
    } 
    
    var sectionElements = document.querySelectorAll(".section-style-form")
    for (i = 0; i < sectionElements.length; i++){
        var sectionData = document.querySelectorAll(".section-style-form")[i].getAttribute("data");
        if (sectionData == 0 || sectionData == ""){
         isFilled = false; 
        }
    }
    
    if  (isFilled == false) {
        alert("Нужно заполнить все поля");
    } else {
        sendValues ();
    }
}

function sendValues () {
    var finalProfile = {};
    var sectionElements = document.querySelectorAll(".section-style-form")
    for (i = 0; i < sectionElements.length; i++){
        var sectionFormData = sectionElements[i].getAttribute("data");
        var questions = sectionElements[i].getAttribute("data-key");
        finalProfile[questions] = sectionFormData;
    }
    console.log(JSON.stringify(finalProfile));
}

