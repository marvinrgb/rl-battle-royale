import logger from './logger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(logger.logTable);

app.use(express.json());


class Game {
  constructor (max_players, captain_id, power_ups, duration_till_last_circle) {
    this.max_players = max_players;
    this.players.push(captain_id);
    this.power_ups = power_ups;
    this.captain = captain_id;
    this.duration_till_last_circle = duration_till_last_circle;
  }
  max_players;
  players = [];
  power_ups = [];
  seeker;
  captain;
  startTime;
  duration_till_last_circle;
}

const games = [];


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


/*
game setting in body -> duration till last circle, max players, which powerups...
*/
app.post('/game/create', (req, res) => {
  console.log(req.body)
  let game = new Game(req.body.max_players, req.body.power_ups, req.body.duration_till_last_circle)
  res.send("test")
})

app.post('/game/join/:game_id', (req, res) => {
  
})

function getNewPlayer(username, socket_id) {
  let id = Math.floor(Math.random() * 1000000000);
  return {
    "player_id" : id,
    "username" : username,
    "socket_id" : socket_id
  }
}

let players = [];

io.on('connection', (socket) => {
  // console.log('[socket] ' + socket.id);
  socket.on('sign-in', (data) => {
    let player_instance = players.find((p) => p.player_id == data.player_id);
    if (players[players.indexOf(player_instance)]) {
      players[players.indexOf(player_instance)].socket_id = socket.id;
      console.log('[socket - signIn] ' + player_instance.username + ' with playerId: ' + data.player_id + ' , socketId: ' + socket.id);
    } else {
      socket.emit('reset-client-auth');
    }
  });
  socket.on('sign-up', (data) => {
    let p = getNewPlayer(data.username, socket.id);
    players.push(p);
    socket.emit('sign-up-new-id', {'player_id' : p.player_id});
    console.log('[socket - signUp] ' + p.username);
  });
})



server.listen(PORT, () => {
  log(`Running on port ${PORT}`);
})

function log(s) {
  console.log(s);
}