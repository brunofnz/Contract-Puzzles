const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('Game4', function () {
  let game;

  beforeEach(async function () {
    const Game = await ethers.getContractFactory('Game4');
    game = await Game.deploy();
    await game.deployed();
  });

  it('should be a winner', async function () {
    const player1 = await ethers.provider.getSigner(0);
    const player2 = await ethers.provider.getSigner(1);

    const player1Address = await player1.getAddress();
    const player2Address = await player2.getAddress();

    await game.connect(player2).write(player1Address);
    await game.connect(player1).win(player2Address);

    assert(await game.isWon(), 'You did not win the game');
  });
});
