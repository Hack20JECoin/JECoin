var JECoin = artifacts.require("./JECoin.sol");

contract('JECoin', function(accounts) {
  it("should put 1000000000 JECoin in the first account", function() {
    return JECoin.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000000000, "1000000000 wasn't in the first account");
    });
  });
});
