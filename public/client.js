let socket = io();
let borrowerName = document.getElementById("borrowerName");
let objectToBorrow = document.getElementById("objectToBorrow");
let sendButton = document.getElementById("sendButton");
let borrowListDisplay = document.getElementById("borrowListDisplay");
let listItems = [];

sendButton.onclick = function() {
    if(borrowerName.value && objectToBorrow.value) {
        let today = new Date();
        let fullDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        socket.emit("loanData", {name: borrowerName.value, object: objectToBorrow.value, date: fullDate, returned: false});
        borrowerName.value = "";
        objectToBorrow.value = "";
    }
}

socket.on("borrowList", function(readList) {
    for(let i = 0; i < readList.length; i++) {
        console.log(readList[i]);
        let newListItem = document.createElement("li");
        newListItem.innerHTML = readList[i].name + ", " + readList[i].object, + ", " + readList[i].date + ", " + readList[i].returned;
        borrowListDisplay.appendChild(newListItem);
        listItems.push(newListItem);
    }
});