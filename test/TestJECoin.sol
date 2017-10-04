pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/JECoin.sol";

contract TestJECoin {

  JECoin TestJECoin;
  address one;
  address two;

  function beforeAll() {
    TestJECoin = JECoin(DeployedAddresses.JECoin());
    one = 0x1111111111111111111111111111111111111111;
    two = 0x2222222222222222222222222222222222222222;
    TestJECoin.transfer(one, 1);
    TestJECoin.transfer(two, 2);
  }

  function testInitialBalanceUsingDeployedContract() {
    uint expected = 1000000000;

    Assert.equal(TestJECoin.balanceOf(msg.sender), expected, "Owner should have 1000000000 JECoin initially");
  }

  function testBalances() {
    Assert.equal(TestJECoin.balanceOf(one), 1, "Expected one coin");
  }

}
