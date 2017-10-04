var JECoin = artifacts.require("./JECoin.sol");

module.exports = function(deployer) {
  deployer.link(ConvertLib, JECoin);
  deployer.deploy(JECoin);
};
