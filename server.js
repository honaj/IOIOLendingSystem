const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jsonfile = require("jsonfile");
const borrowList = "list.json";
let listToWrite = [];

app.use(express.static('public'));
app.use(express.static('list.json'));

http.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', function(socket){
  socket.on('loanData', function (loanData) {
    jsonfile.readFile(borrowList, function (err, listToRead) {
      listToWrite = listToRead;
      listToWrite.push(loanData);
      if (err) console.error(err)
      jsonfile.writeFile(borrowList, listToWrite, { spaces: 2 })
      .then(res => {
        console.log('Write complete')
      })
      .catch(error => console.error(error))
      io.emit("getList", listToWrite);
      
    })
  });
});