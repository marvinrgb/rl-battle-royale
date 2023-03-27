import logger from './logger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(logger.logTable);

app.use(express.json());


class Game {
  code;
  constructor (player) {
    this.players.push(player);
    this.captain = player.player_id;
    this.code = Math.floor(Math.random() * 10000);
  }
  max_players = 10;
  players = [];
  power_ups = [];
  seeker;
  captain;
  startTime;

  joinPlayer(player_id) {
    if (this.players.find((p) => p.id == player_id)) return;
    this.players.push({
      'id' : player_id
    })
  }
}

const games = [];

function getNewPlayer(username, socket_id) {
  let id = Math.floor(Math.random() * 1000000000);
  return {
    "player_id" : id,
    "username" : username,
    "socket_id" : socket_id
  }
}

function getPlayerBySocket(socket_id) {
  return players.find((p) => p.socket_id == socket_id);
}
function getGameByCode(code) {
  return games.find((g) => g.code == code);
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
  socket.on('create-game', (data) => {
    const game = new Game(getPlayerBySocket(socket.id))
    games.push(game);
    console.log("[games - create] Created Game with Code " + game.code);
    socket.emit('game-joined', (game));
    socket.join(String(game.code));
  });
  socket.on('join-game', (data) => {
    const player = getPlayerBySocket(socket.id)
    getGameByCode(data.code).joinPlayer(player);
    const game = getGameByCode(data.code);
    console.log(`[games - join] ${player.username} joined Game ${data.code}`);
    socket.emit('game-joined', (game));
    io.to(game.code).emit('player-joined', ({
      'username' : player.username
    }))
    socket.join(String(game.code));
  })
  socket.on('start-game', (data) => {

  })
})



server.listen(PORT, () => {
  log(`Running on port ${PORT}`);
})

function log(s) {
  console.log(s);
}