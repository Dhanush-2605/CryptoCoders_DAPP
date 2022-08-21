// var CryptoCoder = artifacts.require("./CryptoCoder.sol");
var CryptoCoder=artifacts.require("../contracts/CryptoCoder.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoCoder);
};
