export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 2,
  time: 0
});


export function changeLevel(game, level) {
  if (typeof level !== 'number') {
    throw new Error('Level should be of type number');
  }
  if (level < 0) {
    throw new Error('Level should not be negative value');
  }
  const newGame = Object.assign({}, game, {level});
  return newGame;
}
