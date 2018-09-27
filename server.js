let express = require('express');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('list.json'));

http.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', function(socket){
  socket.on('loanData', function (loanData) {
    console.log(loanData);
    
  });
}); 