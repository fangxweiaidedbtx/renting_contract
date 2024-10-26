const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};

const Storage = artifacts.require("Storage");
 
module.exports = function (deployer) {
  deployer.deploy(Storage);
};

const RentalContract = artifacts.require("RentalContract");
 
module.exports = function (deployer) {
  deployer.deploy(RentalContract);
};