const ethers = require("ethers");

const RPC='https://eth-sepolia.g.alchemy.com/v2/dMLldqTaot-6QCQH4CDx9y_mwoJs5plz';
account='0x067eB811C35e4F5aB59CfBa8410Dc811CCbB1166';
const privateKey='64f7db72fb1100c5e0b49a8adfd75147f3e2fd35db0a4a62ad0f01be81a36563';
const provider =new ethers.providers.JsonRpcProvider(RPC);

// const account =new ethers.Wallet(
//     privatekey,
//     provider
// );

async function call(){
    const balance=await provider.getBalance(account)
    // const balanceInEth=(+balance)/Math.pow(10,18)
    const balanceInEth= await ethers.utils.formatEther(balance)
    // console.log(Number(balance))
    console.log("Balance:",balanceInEth)

}
call();