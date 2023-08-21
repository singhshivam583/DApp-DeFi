var ABC=artifacts.require("./ABC.sol");

module.exports=function(deployer){
    deployer.deploy(ABC);
};

// truffle compile
// truffle migrate
// truffle --reset
