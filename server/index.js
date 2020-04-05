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

  socket.on('player', function(player){
    console.log('player',player)

    // player exist do nothing
    if (player && player.id in players) {}
    else {
    // save new player to players array
      player.status = "online"
      players = Object.assign(players, {[player.id]: player})
    }

    console.log('update players',players)
    // emit to game update
    io.emit('game update', {players});
  });

  socket.on('offline', function(state){
    const dPlayer = state.player
    
    if(dPlayer) {
      dPlayer.status = "offline"
      players[dPlayer.id] = dPlayer
      
      // emit to game update
      io.emit('game update', {players});
      console.log(`${dPlayer.name} disconnected`);
    }
  })

  socket.on('disconnect', function(){
    console.log(`user disconnected`);
  });
})

// app.use("/", http.static("build"));   

http.listen(port, function() {
  console.log(`listening on ${port}`)
})