let ethers = require("ethers");

const RPC='HTTP://127.0.0.1:7545';
senderAcc='0x2c7415ABb6917643A27692bd971eA692db1F53F3';
receiverAcc='0xA7A35db2F02B51175365dcF523412445bAb90834';
let privateKey='0x692d720376998c4a08387c960511dc2dbac7368fa8902a4fc38431a2dc7e230b';

const provider =new ethers.providers.JsonRpcProvider(RPC);

const wallet =new ethers.Wallet(privateKey, provider);

async function sendEth(){
    const balance=await provider.getBalance(senderAcc);
    if(ethers.utils.formatEther(balance)>=10){
        console.log("Balance:",ethers.utils.formatEther(balance));
        await wallet.sendTransaction({
            from: senderAcc,
            to: receiverAcc,
            value: ethers.utils.parseEther("10")
        });
        const balance1=await provider.getBalance(senderAcc);
        console.log("Balance-Left:",ethers.utils.formatEther(balance1));
    }else{
    console.log("Insufficient Balance");
    };
}
sendEth();