const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const port = process.env.PORT || 4001;

app.get('/', function(req, res){
  res.send({ response: "I am alive" }).status(200);
})

io.on('connection', function (socket) {
  console.log('a user connected:', socket.id)

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})

// app.use("/", http.static("build"));   

http.listen(port, function() {
  console.log(`listening on ${port}`)
})