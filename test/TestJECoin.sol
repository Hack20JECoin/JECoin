pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/JECoin.sol";

contract TestJECoin {

  function testInitialBalanceUsingDeployedContract() {
    JECoin coin = JECoin(DeployedAddresses.JECoin());

    uint expected = 1000000000;

    Assert.equal(coin.balanceOf(tx.origin), expected, "Owner should have 1000000000 JECoin initially");
  }

  function testInitialBalanceWithNewJECoin() {
    JECoin coin = new JECoin();

    uint expected = 1000000000;

    Assert.equal(coin.balanceOf(tx.origin), expected, "Owner should have 1000000000 JECoin initially");
  }

}
