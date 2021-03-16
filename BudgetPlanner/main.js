var budget = [];
var comment = [];
var amount = [];
var btn = " <button id ='deleteDep'src='edit.svg' value='Delete' onclick='deleteRow(this)'><img src='edit.svg' width='15' height='20'>Delete</button> ";

const budgetTotal = document.getElementById("budgetTotal");

var modal = document.getElementById('myModal');
var myButton = document.getElementById("myButton");
var span = document.getElementsByClassName("closeModal")[0];
myButton.onclick = function() {
modal.style.display = "block";
}

span.onclick = function() {
modal.style.display = "none";
}


window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}
var rowCount = 1;



function addBudget() {

budget.push(document.getElementById("budgetname").value);
comment.push(document.getElementById("budgetdesc").value);
amount.push(document.getElementById("budgetamount").value);
var table = document.getElementById("budgetTable");
var row = table.insertRow(rowCount);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4)
cell1.innerHTML = budget[rowCount - 1];
cell2.innerHTML = comment[rowCount - 1];
cell3.innerHTML = amount[rowCount - 1];
cell5.innerHTML = btn;
rowCount++;



sessionStorage.setItem('budget', JSON.stringify(budget));
sessionStorage.setItem('comment', JSON.stringify(comment));
sessionStorage.setItem('amount', JSON.stringify(amount));

sumRow()
modal.style.display = "none";
document.getElementById('budgetname').value = ''
document.getElementById("budgetdesc").value =''
document.getElementById("budgetamount").value=''



}
function showBudget(){
var budget = JSON.parse(sessionStorage.getItem('budget')) ;
var comment = JSON.parse(sessionStorage.getItem('comment'));
var amount = JSON.parse(sessionStorage.getItem('amount'));
console.log(budget)
var table = document.getElementById("budgetTable");
for (let index = 0; index < amount.length; index++) {
var row = table.insertRow(rowCount);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4)
cell5.innerHTML = btn;

cell1.innerHTML = budget[index];
cell2.innerHTML = comment[index];
cell3.innerHTML = amount[index];


}
sumRow()


}
function deleteRow(row){
var d = row.parentNode.parentNode.rowIndex;
document.getElementById('budgetTable').deleteRow(d);
console.log(amount[d-1])
rowCount = rowCount-1
console.log(rowCount)
amount = amount.filter(item => item !== amount[d-1])
budget = budget.filter(item => item !== budget[d-1])
comment = comment.filter(item => item !== comment[d-1])

console.log(amount.length,amount)


sessionStorage.setItem('budget', JSON.stringify(budget));
sessionStorage.setItem('comment', JSON.stringify(comment));
sessionStorage.setItem('amount', JSON.stringify(amount));
sumRow()

}
function sumRow(){


var amount = JSON.parse(sessionStorage.getItem('amount'))
console.log(amount)
var sum = Number(0);
for (let index = 0; index < amount.length; index++) {
console.log(amount[index])
sum += Number(amount[index])
console.log(sum)
}


budgetTotal.innerText= sum;

}
function resetBudget(){
sessionStorage.clear();


}
