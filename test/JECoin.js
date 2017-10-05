var JECoin = artifacts.require("./JECoin.sol");

contract('JECoin', function(accounts) {
  console.log('available accounts: ', accounts);
  const owner = accounts[0];
  const ownerName = "owner";
  const accountOne = accounts[1];
  const accountOneName = "one";
  const accountTwo = accounts[2];
  const accountTwoName = "two";

  it("should put 1000000000 JECoin in the first account", function() {
    return JECoin.deployed().then(function(instance) {
      return instance.balanceOf.call(owner);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000000000, "1000000000 wasn't in the first account");
    });
  });

  it("should send coin correctly", function() {
    let coin;

    // Get initial balances of first and second account.
    let owner_starting_balance;
    let accountOne_starting_balance;
    let owner_ending_balance;
    let accountOne_ending_balance;

    let amount = 10;

    return JECoin.deployed().then(function(instance) {
      coin = instance;
      return coin.balanceOf.call(owner);
    }).then(function(balance) {
      owner_starting_balance = balance.toNumber();
      return coin.balanceOf.call(accountOne);
    }).then(function(balance) {
      accountOne_starting_balance = balance.toNumber();
      return coin.transfer(accountOne, amount, {from: owner});
    }).then(function() {
      return coin.balanceOf.call(owner);
    }).then(function(balance) {
      owner_ending_balance = balance.toNumber();
      return coin.balanceOf.call(accountOne);
    }).then(function(balance) {
      accountOne_ending_balance = balance.toNumber();

      assert.equal(owner_ending_balance, owner_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(accountOne_ending_balance, accountOne_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });

  it("can register and read usernames", function() {
    let coin;

    return JECoin.deployed().then(function(instance) {
      coin = instance;
      return coin.registerUsername.call(ownerName, owner);
    }).then(function() {
      return coin.addressOf.call(ownerName)
    }).then(function(address) {
      assert.equal(address, owner, "Owner name wasn't registered or wasn't read.");
    });
  });

  it("can change a registered username", function() {
    let coin;

    return JECoin.deployed().then(function(instance) {
      coin = instance;
      return coin.registerUsername.call(accountOneName, accountOne);
    }).then(function() {
      return coin.changeUsername.call(accountOneName, ownerName)
    }).then(function(success) {
      return coin.addressOf.call(ownerName);
    }).then(function(address) {
      assert.equal(address, owner, "Owner didn't take over account one");
    });
  });

  it("can delete a registered username", function() {
    let coin;

    return JECoin.deployed().then(function(instance) {
      coin = instance;
      return coin.registerUsername.call(accountTwoName, accountTwo);
    }).then(function() {
      return coin.deleteUsername.call(accountTwoName)
    }).then(function() {
      return coin.addressOf.call(accountTwoName);
    }).then(function(address) {
      assert.equal(address, 0x0, "Account one name wasn't deleted");
    });
  });
});
