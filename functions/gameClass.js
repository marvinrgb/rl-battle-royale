import generateCircles from './generateCircles.js';
export default class Game {

  static games = [];

  code;
  constructor (player) {
    this.players.push(player);
    this.captain = player.player_id;
    this.code = Math.floor(Math.random() * 10000);
    Game.games.push(this);
  }
  max_players = 10;
  players = [];
  power_ups = [];
  seeker;
  captain;
  startTime;
  circles = [];

  joinPlayer(player_id) {
    if (this.players.find((p) => p.id == player_id)) return;
    this.players.push({
      'id' : player_id
    })
  }

  start(coords) {
    this.circles = generateCircles(coords);
    return this.circles;
  }
}