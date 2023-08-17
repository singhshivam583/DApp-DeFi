var Simple= artifacts.require("Dao");

module.exports=function(deployer){
    deployer.deploy(Simple,"3600","3600","51");
};