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

class loanData {
    constructor(name, object, date, returned) {
        this.name = name;
        this.object = object;
        this.date = date;
        this.returned = returned;
    }
    returnObject() {
        this.returned = !this.returned;
    }
}

//Create new loan instance and send to server
sendButton.onclick = function() {
    if(borrowerName.value && objectToBorrow.value) {
        let today = new Date();
        let fullDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        let newLoan = new loanData(borrowerName.value, objectToBorrow.value, fullDate, false);
        socket.emit("loanData", newLoan);
        borrowerName.value = "";
        objectToBorrow.value = "";
    }
}

//Get json from server and redraw table
socket.on("populateTable", function(list) {
    console.log(list);
    for(cell of cells) {
        cell.remove();
    }
    for(item of list) {
        //console.log(item);
        cells.push(nameRow.insertCell().appendChild(document.createTextNode(item.name)));
        cells.push(objectRow.insertCell().appendChild(document.createTextNode(item.object)));
        cells.push(dateRow.insertCell().appendChild(document.createTextNode(item.date)));
        let buttonCell = returnedRow.insertCell();
        cells.push(buttonCell.appendChild(document.createTextNode(item.returned)));
        //document.createElement("button")
    }
});

