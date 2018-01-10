export const makingActions = 0;
// makingActions - Users are given a a certain amount of time

export const placingPlayers = 1;
// placingPlayers - after a player dies the next turn they can place themselves

export const playingMoves = 2;
// playingMoves - playing back moves the user has made and showing the repercussions

export const asteroidPanic = 3;

export const gameStates = {
    makingActions,
    playingMoves,
    asteroidPanic,
    placingPlayers
};

export const gameStateProgression = [
    makingActions,
    placingPlayers,
    playingMoves,
    asteroidPanic,
]

// board size
// 12x6
export const options = {
  moveNumber: 3,  // amount of moves everyone gets per movement segment
  rounds: 11,  // how many vertical spaces. onces the rounds are over the game ends
  columns: 6,  // essentially how many players there are
}
