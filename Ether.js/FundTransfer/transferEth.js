const ethers = require("ethers");

const RPC='https://eth-sepolia.g.alchemy.com/v2/dMLldqTaot-6QCQH4CDx9y_mwoJs5plz';
// senderAcc='0x067eB811C35e4F5aB59CfBa8410Dc811CCbB1166';
receiverAcc='0x947e7763369e849493BDeCfaC8c08200620642DC';
let privateKey='64f7db72fb1100c5e0b49a8adfd75147f3e2fd35db0a4a62ad0f01be81a36563';

const provider =new ethers.providers.JsonRpcProvider(RPC);

const wallet =new ethers.Wallet(privateKey, provider);

async function sendEth(){
    const balance=await provider.getBalance(await wallet.getAddress());

    if(ethers.utils.formatEther(balance)>=0.01){
        console.log("Balance:",ethers.utils.formatEther(balance));
        const trns=await wallet.sendTransaction({
            to: receiverAcc,
            value: ethers.utils.parseEther("0.01")
        });
        await trns.wait();

        const balance1=await provider.getBalance(await wallet.getAddress());
        console.log("Balance-Left:",ethers.utils.formatEther(balance1));
    }else{
    console.log("Insufficient Balance");
    };
}
sendEth(); 