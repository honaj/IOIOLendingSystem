const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jsonfile = require("jsonfile");
const borrowListJson = "list.json";
let borrowList = [];

app.use(express.static('public'));
app.use(express.static('list.json'));

http.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', function(socket){
  refreshList();
  //console.log(refreshList())
  socket.on('loanData', function (loanData) {
      
      borrowList.push(loanData);
      
      jsonfile.writeFile(borrowListJson, borrowList, { spaces: 2 })
      .then(res => {
        console.log('Write complete')
      })
      .catch(error => console.error(error))
  });
});

function pushListToClient() {
  
}

function refreshList () {
  jsonfile.readFile(borrowListJson, function (err, list) {
    //borrowList = list;
    console.log(list);
    if (err) console.error(err)
    io.emit("populateTable", list);
  })
}