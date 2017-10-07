var JECoin = artifacts.require("./JECoin.sol");
var Coordinator = artifacts.require("./Coordinator.sol");
var BountyFactory = artifacts.require("./BountyFactory.sol");

module.exports = function(deployer) {
  deployer.deploy([JECoin, BountyFactory]).then(() => {
      deployer.deploy(Coordinator, JECoin.address, BountyFactory.address)
  });
};
