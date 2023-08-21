require("@nomicfoundation/hardhat-toolbox");

// import('hardhat/config').HardhatUserConfig;


task("accounts","Prints the list of accounts",async (taskArgs, hre) => {
  const accounts=await hre.ethers.getSigners(); 
  
  
  for(const account of accounts) {
    const address=await account.address;
    const balance=await ethers.provider.getBalance(address);
    const balanceInEther=(Number(balance))/Math.pow(10,18);
    // const balanceInEther= hre.ethers.utils.formatEther(balance);

    // console.log(address+":"+ balance);
    console.log(`Account: ${address}, Balance:${balanceInEther}`);
    // console.log(account.address);
    // console.log(account);
  }
});

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: 'localhost',
  networks:{
    localhost:{
      url:"http://127.0.0.1:7545"
      // ganache
    },
    hardhat:{},
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/dMLldqTaot-6QCQH4CDx9y_mwoJs5plz",
      accounts:["64f7db72fb1100c5e0b49a8adfd75147f3e2fd35db0a4a62ad0f01be81a36563"]
    }
  },
  paths:{
    sources:"./contracts",
    tests:"./test",
    cache:"./cache",
    artifacts:'./artifacts'
  }                          
};
