document.querySelector("#button-size-field").onclick = beginBattle;//обработчик нажатия на кнопку
document.querySelector("#button-size-field").addEventListener('touchstart', beginBattle, false);//для тачскрина вместо клика

var size;//сюда записано ширина игрового поля которую ввел пользователь
var isEven = true;//нужна для проверки четности клика по полю, если true то ставить крестик, если false то нолик
var gameInfoElement = document.querySelector("#game-info");//запишем информационное поле игры в переменную
var gameOriginalFormElement = document.querySelector("#game-original-form");//запишем начальную форму для поля игры в переменную


function beginBattle(){                 //эта функция обрабатывает введенные данные
    var sizeField = document.querySelector("#input-size-field").value;//этой переменной присваивается размер поля
    var FIELD_MIN_SIZE = 5;//миинмальный размер поля
    var FIELD_MAX_SIZE = 20;//максимальный размер поля
    var intValue = parseFloat(sizeField);//преобразует введенные значения в цифровой тип, если вводится строка то возвращает NaN 
    if (isNaN(intValue) == false){       //если intValue не NaN то программа выполняется дальше
        gameInfoElement.style.color = "#42586a";//устанавливаем цвет текста окна информации в #42586a
        if (sizeField < FIELD_MIN_SIZE){                                                        //проверка чтобы поле не было меньше 5
            gameInfoElement.innerText='Размер поля не может быть меньше 5';//изменение текста окна информации
            return;
        }   
        if (sizeField > FIELD_MAX_SIZE){                                 //проверка чтобы поле не было больше 20
            gameOriginalFormElement.innerHTML = '';//очистка формы
            var img = document.createElement("IMG");//создание элемента с изображением
            img.setAttribute('id','small-cells');//установка айди для изображения
            img.src = "Her_uvidish.jpg";//ссылка на изображение для элемента
            gameOriginalFormElement.appendChild(img);//вставка элемента в начальную форму
            gameInfoElement.innerText = 'А йо, мой маленький нигер! Придётся одевать очки !';//изменение текста окна информации
            return;
        }else{                     //если размер поля отвечает требованиям
            createField(sizeField);//запускаем функцию которая строит динамическую таблицу
            size = sizeField;//присваиваем глобальной переменной введенное в текстовое поле значение
            isEven = true;//устраняем случай когда в isEven остается false после повторного нажатия на кнопку построения поля, первым всегда будет ставится крестик
        }
    }else{
        gameInfoElement.innerText = 'Але! Нужно ввести число !';
        return;
    }
}

function createField(sizeField) {                  //эта функция строит динамическое поле для игры в зависимости от вводимого значения
    var newElement=document.createElement("table");//создаине таблици
    newElement.setAttribute('id','game-field');//установка атрибутов для таблици
    for (i = 0; i < sizeField; i++){
        var newRow = newElement.insertRow(i);//создание рядов таблицы в количестве sizeField штук
        for (j = 0; j < sizeField; j++){
            var newCell = newRow.insertCell(j);//создание ячеек в количестве sizeField штук внутри каждого ряда
            newCell.setAttribute('data-original','Clear');//установка дата антрибута для ячеек, 'Clear' значит что ячеека пока без крестика или нолика
            newCell.setAttribute('class','cell-style');//для всех ячеек присваивается класс с именем cell-style
            newCell.onclick = setXorO;//запускаем проверку что будет ставится, нолик или крестик
            newCell.addEventListener('touchstart', setXorO, false);//это для тачпада. Запуск проверки на крестик или нолик
            
        }
    }
    gameOriginalFormElement.innerHTML = '';//очистка блока game-original-form после повторного нажатия на кнопку
    gameOriginalFormElement.appendChild(newElement);//добавление таблици внутрь блока game-original-form
    gameInfoElement.innerText = 'Игра началась';//изменение текста окна информации
}

function setXorO () {                                                           //эта функция вызывается после каждого клика по ячейке, она выбирает что ставить и можно ли ставить в данную ячейку
    if (isEven !== "nowEnd"){                                                   //если не определен победитель
        if (this.getAttribute('data-original') == "Clear"){                     //если в ячейке все еще вписан датаатрибут "Clear", то работа с ячейкой продолжается
            if (isEven == true){                                                //с таким условием будет устанавливатся крестик
                this.className = "cell-style-x";//ячейке по которой нажали изменям класс который соответсвует отобрежению крестика
                isEven = false;//присваиваем false чтобы следующий клик ставил нолик
                this.setAttribute('data-original','X');//меняем этой ячейке датаатрибут на 'X'
                gameInfoElement.innerText = 'Ходит нолик !';//сигнализируем что теперь очередь ходить нолику
                gameInfoElement.style.color = ("#42586a");//устанавливаем цвет тексту окна информации на стоковый, вдруг он был раньше изменен
            } else {                            //с таким условием будет устанавливатся нолик
                this.className = "cell-style-o";//ячейке по которой нажали изменям класс который соответсвует отобрежению нолика 
                isEven = true;//присваиваем true чтобы следующий клик ставил крестик
                this.setAttribute('data-original','O');//меняем этой ячейке датаатрибут на 'O'
                gameInfoElement.innerText = 'Ходит крестик !';//сигнализируем что теперь очередь ходить крестику
                gameInfoElement.style.color = ("#42586a");//устанавливаем цвет тексту окна информации на стоковый, вдруг он был раньше изменен
            }
        } else { return };
    } else { return };
    isWin();//запускаем функцию проверки на победу если все условия выполняются
}

function isWin(){ 
    var dataArrayCells=[];//массив который содержит в себе дата атрибуты ячеек таблицы - 'data-original'
    for( var n = 0; n < size; n++) dataArrayCells[n]=[];//указываем что наш массив состоит из других массивов
    var ALL_CELLS = size*size;//общее количество ячеек
    var amount = 0;//если эта константа дорастет до общего количества ячеек, то будет сообщение о ничьей
    for (j = 0; j < size; j++){ 
        for(var i = 0; i < size; i++)
            dataArrayCells[j][i] = document.querySelector("#game-field").rows[j].cells[i].getAttribute('data-original');//создание двумерного масива из датаатрибутов
    }
    
    for (j = 0; j < size; j++){                  //проверяем сколько осталось ячеек без датаатрибута "Clear"
        for(i = 0; i < size; i++){
            if(dataArrayCells[j][i] !== "Clear" ){
               amount++;              
            }
        }
    } 
    
    if (amount == ALL_CELLS){              //если amount дорасла до общего количества ячеек, значит пустых клеток не осталось, НИЧЬЯ
        gameInfoElement.innerText = 'Ничья';
        gameInfoElement.style.color = "blue";
        isEven = "nowEnd";
        return;
     }      
    
    for (j=0; j<size; j++){                  //проверка по горизонтали на нолик                               
        for(i=0; i<size; i++){
            if(dataArrayCells[j][i] == "O" && dataArrayCells[j][i+1] == "O" && dataArrayCells[j][i+2] == "O" && dataArrayCells[j][i+3] == "O" && dataArrayCells[j][i+4] == "O"){
                gameInfoElement.innerText = 'Победил нолик !';
                gameInfoElement.style.color = "red";
                isEven = "nowEnd";
                return;
            }
        }
    }
    
    for (j = 0; j < size; j++){              //проверка по горизонтали на крестик                                                         
        for(i = 0; i < size; i++){
            if (dataArrayCells[j][i] == "X" && dataArrayCells[j][i+1] == "X" && dataArrayCells[j][i+2] == "X" && dataArrayCells[j][i+3] == "X" && dataArrayCells[j][i+4] == "X"){
                gameInfoElement.innerText = 'Победил крестик !';
                gameInfoElement.style.color = "green";
                isEven = "nowEnd";
                return;
            }
        }
    }
    
    for (j = 0; j < size-4; j++){             //проверка по вертикали на нолик
        for(i = 0; i < size; i++){
            if(dataArrayCells[j][i] == "O" && dataArrayCells[j+1][i] == "O" && dataArrayCells[j+2][i] == "O" && dataArrayCells[j+3][i] == "O" && dataArrayCells[j+4][i] == "O"){
                gameInfoElement.innerText = 'Победил нолик !';
                gameInfoElement.style.color = "red";
                isEven = "nowEnd";
                return
            }
        }
    }
    
    for (j = 0; j < size-4; j++){               //проверка по вертикали на крестик 
        for(i = 0; i < size; i++){
            if(dataArrayCells[j][i] == "X" && dataArrayCells[j+1][i] == "X" && dataArrayCells[j+2][i] == "X" && dataArrayCells[j+3][i] == "X" && dataArrayCells[j+4][i] == "X"){
                gameInfoElement.innerText = 'Победил крестик !';
                gameInfoElement.style.color = "green";
                isEven = "nowEnd"; 
                return;
            }
        }
    }   
    
    for (j = 0; j < size-4; j++){               //проверка по диагонали сверху направо на нолик
        for(i = 0; i < size-1; i++){
            if(dataArrayCells[j][i] == "O" && dataArrayCells[j+1][i+1] == "O" && dataArrayCells[j+2][i+2] == "O" && dataArrayCells[j+3][i+3] == "O" && dataArrayCells[j+4][i+4] == "O"){
                gameInfoElement.innerText = 'Победил нолик !';
                gameInfoElement.style.color = "red";
                isEven = "nowEnd"; 
                return;
            }
        }
    }
    
    for (j = 0; j < size-4; j++){               //проверка по диагонали сверху налево на крестик
        for(i = 0; i < size-1; i++){
            if(dataArrayCells[j][i] == "X" && dataArrayCells[j+1][i+1] == "X" && dataArrayCells[j+2][i+2] == "X" && dataArrayCells[j+3][i+3] == "X" && dataArrayCells[j+4][i+4] == "X"){
                gameInfoElement.innerText = 'Победил крестик !';
                gameInfoElement.style.color = "green";
                isEven = "nowEnd"; 
                return;
            }
        }
    }  
                         
    for (j = 0; j < size-4; j++){                 //проверка по диагонали снизу направо на нолик
        for(i = 0; i < size-1; i++){
            if(dataArrayCells[j+4][i] == "O" && dataArrayCells[j+3][i+1] == "O" &&dataArrayCells[j+2][i+2] == "O" && dataArrayCells[j+1][i+3] == "O" && dataArrayCells[j][i+4] == "O"){
                gameInfoElement.innerText = 'Победил нолик !';
                gameInfoElement.style.color = "red";
                isEven = "nowEnd";
                return;
            }
        }
    }
    
    for (j = 0; j < size-4; j++){                  //проверка по диагонали снизу налево на крестик 
        for(i = 0; i < size-1; i++){
            if(dataArrayCells[j+4][i] == "X" && dataArrayCells[j+3][i+1] == "X" && dataArrayCells[j+2][i+2] == "X" && dataArrayCells[j+1][i+3] == "X" && dataArrayCells[j][i+4] == "X"){
                gameInfoElement.innerText = 'Победил крестик !';
                gameInfoElement.style.color = "green";
                isEven = "nowEnd";
                return;
            }
        }
    } 
    
     
   
}

                     

                          
 