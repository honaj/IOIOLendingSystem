let socket = io();
let borrowerName = document.getElementById("borrowerName");
let objectToBorrow = document.getElementById("objectToBorrow");
let sendButton = document.getElementById("sendButton");
let borrowListTable = document.getElementById("borrowListTable");
let nameRow = document.getElementById("nameRow");
let objectRow = document.getElementById("objectRow");
let dateRow = document.getElementById("dateRow");
let returnedRow = document.getElementById("returnedRow");
let cells = [];

sendButton.onclick = function() {
    if(borrowerName.value && objectToBorrow.value) {
        let today = new Date();
        let fullDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        socket.emit("loanData", {name: borrowerName.value, object: objectToBorrow.value, date: fullDate, returned: false});
        borrowerName.value = "";
        objectToBorrow.value = "";
    }
}

socket.on("getList", function(list) {
    for(cell of cells) {
        cell.remove();
    }
    for(item of list) {
        console.log(item);
        cells.push(nameRow.insertCell().appendChild(document.createTextNode(item.name)));
        cells.push(objectRow.insertCell().appendChild(document.createTextNode(item.object)));
        cells.push(dateRow.insertCell().appendChild(document.createTextNode(item.date)));
        cells.push(returnedRow.insertCell().appendChild(document.createTextNode(item.returned)));
    }
});