const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    const signers = await ethers.getSigners();
    const [signer1, signer2, signer3] = signers

    await game.connect(signer1).buy({ value: '2' }); // Set balance for addr1
    await game.connect(signer2).buy({ value: '3' }); // Set balance for addr2
    await game.connect(signer3).buy({ value: '1' }); // Set balance for addr3

    return { game, signer1, signer2, signer3 };
  }

  it('should be a winner', async function () {
    const { game, signer1, signer2, signer3 } = await loadFixture(deployContractAndSetVariables);

    await game.win(signer1.address, signer2.address, signer3.address);

    assert(await game.isWon(), 'You did not win the game');
  });
});
