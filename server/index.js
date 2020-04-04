const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
var players = {}

const port = process.env.PORT || 4001;

app.get('/', function(req, res){
  res.send({ response: "I am alive" }).status(200);
})

io.on('connection', function (socket) {
  console.log('a user connected:', socket.id)

  // io.emit('game update', players);

  socket.on('new player', function(player){
    console.log('player',player)
    // save to game update
    allplayers = Object.assign(players, {[player.id]: player})
    players = allplayers
    console.log('players',players)
    // emit to game update
    io.emit('game update', players);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})

// app.use("/", http.static("build"));   

http.listen(port, function() {
  console.log(`listening on ${port}`)
})