
const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
//all players
let players = {}
//all games
let allGames = {}

//notifications
// io.emit('notification', {recipient: [player.id || all], message:  `*message*`})

//all states
const allStates = {
  players,
  allGames
}

const port = process.env.PORT || 4001;

app.get('/', function(req, res){
  res.send({ response: "I am alive" }).status(200);
})

io.on('connection', function (socket) {
  console.log('a user connected:', socket.id)

  socket.on('join game', function(player){
    console.log('player',player)

    // does game exist
    if (player && allGames.hasOwnProperty(player.gameId)) {
      // player exist do nothing
      if (player && player.id in players) { 
        // emit to game update
        io.emit('game update', allStates);
      }
      else {
      // save new player to players array
        players = Object.assign(players, {[player.id]: player})
        // emit to game update
        io.emit('game update', allStates);
      }
    }
    else {
      // game don't exist && send notification
      io.emit('join game status', {id: player.id, status: false, message:  `Sorry this game doesn't exist`})
    }

    console.log('update players',players)
  });

  socket.on('host game', function(gameState){
    // check to see if game id exists
    if (allGames.hasOwnProperty(gameState.gameId)) return // do nothing
    else {
      allGames[gameState.gameId] = gameState
      io.emit('game update', allStates);
    }
  });

  socket.on('offline', function(state){
    const dPlayer = state.player
    
    if(dPlayer) {
      dPlayer.status = "offline"
      players[dPlayer.id] = dPlayer
      
      // emit to game update
      io.emit('game update', allStates);
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