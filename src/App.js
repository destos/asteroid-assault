// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

import { Client } from 'boardgame.io/client';
import { Game } from 'boardgame.io/core'

import AsteroidsBoard from './components/Board.jsx';

import { gameStates, options } from './constants';

import _ from 'lodash';


const AsteroidsGame = Game({
  setup: () => {
    // players and their positions
    const player_base = {x: 0, y: 0, id: null};
    const players = [];
    for (var i = 0; i < options.columns; i++) {
      let player = _.clone(player_base);
      player.x = i;
      player.id = i;
      players.push(player);
    }
    return {
      players: players,
      asteroids: Array(options.columns).fill(null),
      currentMove: 0,
      gameState: gameStates.makingActions,
      round: 0
    }
  },
  // States
  // makingActions - Users are given a a certain amount of time
  // playingMoves - playing back moves the user has made and showing the repercussions
  // placingPlayers - after a player dies the next turn they can place themselves
  //

  /*
  The different rules as I remember them
  You have 3 different types of actions
  Move, Shield, Laser
  You have an action card that is sent up when you're done chooing your actions.
  Action card has the option to
  Every ones turns
  */
  reducer: (G) => {
    return G;
  },
  flow: {
    phases: [
      {
        name: gameStates.makingActions
      },
      {
        name: gameStates.playingMoves
      },
      {
        name: gameStates.asteroidPanic
      },
      {
        name: gameStates.placingPlayers
      }
    ]
  },
  moves: {
    clickCell(G, ctx, id) {
      // let cells = [...G.cells];  // don't mutate original state.
      // cells[id] = ctx.currentPlayer;
      // return {...G, cells};      // don't mutate original state.
    },
    finishActions(G, ctx, id) {
      // register all actions the user has registered
    },
    // progressState(G, ctx, id) {
    //   // TODO: may not be a user action and instead part of
    //   // game management object of sorts
    //   let { round, gameState } = G;
    //   const curStateIndex = gameStateProgression.indexOf(gameState);
    //   // next state
    //   gameState = gameStateProgression[curStateIndex+1];
    //   if (gameState === undefined) {
    //     // Loop back to the beginning
    //     gameState = gameStates.makingActions;
    //     round += 1;
    //   }
    //   return {...G, gameState, round}
    // }
  },
  gameOver: (G, ctx) => {
    // If a user makes it to the end they win.
  },
  playerView: (G, ctx) => {
    // Don't show the user the others moves
  }
});

const App = Client({ game: AsteroidsGame, board: AsteroidsBoard });

export default App;
