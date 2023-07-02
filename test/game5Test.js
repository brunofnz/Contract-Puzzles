const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Game5', function () {
  let game;

  beforeEach(async function () {
    const Game = await ethers.getContractFactory('Game5');
    game = await Game.deploy();
    await game.deployed();
  });

  it('should be a winner', async function () {
    await game.win({
      value: ethers.constants.Zero,
      gasPrice: ethers.constants.Zero,
    });

    assert(await game.isWon(), 'You did not win the game');
  });
});
