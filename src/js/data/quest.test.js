
const { changeLevel, INITIAL_GAME } = require("./quest");

describe('Check changeLevel function', () => {

  test('should change level', () => {
    expect(changeLevel(INITIAL_GAME, 1).level).toBe(1);
    expect(changeLevel(INITIAL_GAME, 3).level).toBe(3);
    expect(changeLevel(INITIAL_GAME, 10).level).toBe(10);
    expect(changeLevel(INITIAL_GAME, 344).level).toBe(344);
  });

  test('should be equal or greater than 0', () => {
    expect(() => changeLevel(INITIAL_GAME, -1)).toThrow('Level should not be negative value');
  });

  test('should not set non number value', () => {
    expect(() => changeLevel(INITIAL_GAME, {})).toThrow('Level should be of type number');
    expect(() => changeLevel(INITIAL_GAME, [])).toThrow('Level should be of type number');
    expect(() => changeLevel(INITIAL_GAME, undefined)).toThrow('Level should be of type number');
  });
});