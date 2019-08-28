// migrating the appropriate contracts
var ArwaERC721Token = artifacts.require("./ArwaERC721Token.sol");
var SquareVerifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function(deployer, network) {
  if (network === 'development'){
    await deployer.deploy(ArwaERC721Token);
  }
  deployer.deploy(SquareVerifier).then(function(){
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
  });
  
};
