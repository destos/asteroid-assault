import React from 'react';
import { connect } from 'react-redux';
import { makingActions } from '../constants';
import classnames from 'classnames';

const actions = {
    up: 'up',
    left: 'left',
    right: 'right',
    shield: 'shield',
    fire: 'fire',
};

class ControlPanelRow extends React.Component {
  componentWillMount() {
    this.doFire = this.doFire.bind(this);
    this.doShield = this.doShield.bind(this);
    this.configMove = this.configMove.bind(this);
    this.setCommand = this.setCommand.bind(this);
  }
  setCommand(options) {
    // command option structure
    // type: string ( type of command )
    // value: value of command ( optional )
    this.props.sendCommand(this.props.actionNumber, options);
  }
  configMove(direction) {
    return (event) => {
      this.setCommand({type: direction});
    }
  }
  doFire() {
    this.setCommand({type: actions.fire});
  }
  doShield() {
    this.setCommand({type: actions.shield});
  }
  render() {
    const { disabled, selected } = this.props;
    return (
      <div className='action-row mb-2'>
        <div className="btn-group">
          <button
            type="button"
            disabled={disabled}
            className={classnames('btn btn-primary', {'active': selected === actions.shield})}
            onClick={this.doShield}>
              Shield
          </button>
          <button
            type="button"
            disabled={disabled}
            className={classnames('btn btn-success', {'active': selected === actions.left})}
            onClick={this.configMove(actions.left)}>
              Left
          </button>
          <button
            type="button"
            disabled={disabled}
            className={classnames('btn btn-success', {'active': selected === actions.up})}
            onClick={this.configMove(actions.up)}>
              Up
          </button>
          <button
            type="button"
            disabled={disabled}
            className={classnames('btn btn-success', {'active': selected === actions.right})}
            onClick={this.configMove(actions.right)}>
              Right
          </button>
          <button
            type="button"
            disabled={disabled}
            className={classnames('btn btn-danger', {'active': selected === actions.fire})}
            onClick={this.doFire}>
              Laser
          </button>
        </div>
      </div>
    )
  }
}

class ControlPanel extends React.Component {
  componentWillMount() {
    // why does :: not werk yo
    this.registerCommand = this.registerCommand.bind(this)
    this.canFinishTurn = this.canFinishTurn.bind(this)
    this.setState({
      actions: {}
    });
  }
  finishTurn() {

  }
  canFinishTurn() {
    // All options are chosen
  }
  registerCommand(actionNumber, command) {
    const { actions } = this.state
    let newAction = {...actions}
    newAction[actionNumber] = command;
    this.setState({actions: newAction});
  }
  render() {
    const { moveNumber, gameState } = this.props;
    const { actions } = this.state;
    // Disable control panel when we're not making actions
    const disabled = (gameState !== makingActions)
    const rows = [];
    for (var i = 0; i < moveNumber; i++) {
      const rowNumber = i;
      const currentAction = actions[rowNumber]
      const selected = currentAction ? currentAction.type : null;
      rows.push(
        <ControlPanelRow
          key={"panel-"+rowNumber}
          disabled={disabled}
          selected={selected}
          actionNumber={rowNumber}
          sendCommand={this.registerCommand}/>
      );
    }
    return (
      <div id="controls">
        <h2>Command panel</h2>
        {rows}
        <div className="actions">
          <button type="button" className="btn btn-info" onClick={this.finishTurn} disabled={disabled || this.canFinishTurn()}>Done</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ G }, ownProps) {
  const { gameState } = G;
  return {
    gameState
  };
}

export default connect(mapStateToProps)(ControlPanel)
