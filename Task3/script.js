
document.getElementById("button").onclick = numbers;  
function numbers(){
var a = 1*document.getElementsByClassName("inp")[0].value;
var b = 1*document.getElementsByClassName("inp")[1].value;
   var s=a+b;
   var d=a-b;
   var m=a*b;
   var e=a/b;
  if (document.calc.elements[1][0].selected)  
    document.calc.res.value = s;
    if (document.calc.elements[1][1].selected)  
    document.calc.res.value = d;
    if (document.calc.elements[1][2].selected)  
    document.calc.res.value = m;
    if (document.calc.elements[1][3].selected)  
    document.calc.res.value = e;
    if (document.calc.elements[1][3].selected && b==0) 
    document.calc.res.value = "Але! На ноль делить нельзя!";
}



