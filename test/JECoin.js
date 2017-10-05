var JECoin = artifacts.require("./JECoin.sol");

contract('JECoin', function(accounts) {
  console.log('available accounts: ', accounts);
  const owner = accounts[0];
  const one = accounts[1];

  it("should put 1000000000 JECoin in the first account", function() {
    return JECoin.deployed().then(function(instance) {
      return instance.balanceOf.call(owner);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000000000, "1000000000 wasn't in the first account");
    });
  });

  it("should send coin correctly", function() {
    var coin;

    // Get initial balances of first and second account.
    var owner_starting_balance;
    var one_starting_balance;
    var owner_ending_balance;
    var one_ending_balance;

    var amount = 10;

    return JECoin.deployed().then(function(instance) {
      coin = instance;
      return coin.balanceOf.call(owner);
    }).then(function(balance) {
      owner_starting_balance = balance.toNumber();
      return coin.balanceOf.call(one);
    }).then(function(balance) {
      one_starting_balance = balance.toNumber();
      return coin.transfer(one, amount, {from: owner});
    }).then(function() {
      return coin.balanceOf.call(owner);
    }).then(function(balance) {
      owner_ending_balance = balance.toNumber();
      return coin.balanceOf.call(one);
    }).then(function(balance) {
      one_ending_balance = balance.toNumber();

      assert.equal(owner_ending_balance, owner_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(one_ending_balance, one_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
