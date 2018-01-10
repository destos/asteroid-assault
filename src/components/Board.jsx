import React from 'react';
// import Grid from 'boardgame.io/src/ui/grid';
import Grid from './ui/grid';
import Token from './ui/token';

import ControlPanel from './ControlPanel.jsx';

import { options } from '../constants';

export default class AsteroidsBoard extends React.Component {
  // TODO do round tracking and indication first.
  renderGamePieces() {
    const { asteroids, players } = this.props.G;
    return players.map((player) => {
        return (<Token x={player.x} y={player.y+1} animate={true} key={player.id}>
            player {player.x} {player.y}
        </Token>);
    });
    // return [];
  }
  render() {
    return [
      <div id="board" key="board">
        <Grid rows={options.rounds} cols={options.columns} style={{width: '700px', height: '1000px'}}>
            {this.renderGamePieces()}
        </Grid>
      </div>,
      <ControlPanel key="panel" moveNumber={3}/>
    ];
  }
}
