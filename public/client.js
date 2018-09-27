let socket = io();
let borrowerName = document.getElementById("borrowerName");
let objectToBorrow = document.getElementById("objectToBorrow");
let sendButton = document.getElementById("sendButton");

function onDocumentReady() {
    
}

sendButton.onclick = function() {
    if(borrowerName.value && objectToBorrow.value) {
        let today = new Date();
        let fullDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        socket.emit("loanData", {name: borrowerName.value, object: objectToBorrow.value, date: fullDate});
        borrowerName.value = "";
        objectToBorrow.value = "";
    }
}

if (document.readyState != 'loading') {
    onDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
}
   