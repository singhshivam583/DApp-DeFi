const ethers = require("ethers");
const transfer=require("./transsfer.json");

const RPC='https://eth-sepolia.g.alchemy.com/v2/dMLldqTaot-6QCQH4CDx9y_mwoJs5plz';
account='0x424578f26FEfA0A6b4c4d4274032fFA09C2c9f79';     //public account
const privateKey='64f7db72fb1100c5e0b49a8adfd75147f3e2fd35db0a4a62ad0f01be81a36563';
const provider =new ethers.providers.JsonRpcProvider(RPC);
const wallet =new ethers.Wallet(privateKey, provider);   //signer

const contractAddress='0x56Aedf2acB9C5028429e5ee0E72af70Fcf1EFBB3';
const ABI=transfer.abi;

async function write(){
   
    const contract=new ethers.Contract(
        contractAddress,
        ABI,
        wallet
    );
    console.log(`${account} : ${ethers.utils.formatEther(await provider.getBalance(account))}`);
    console.log(`${await wallet.getAddress()} : ${ethers.utils.formatEther(await wallet.getBalance())}`);

    const send=await contract._transfer(account,{
        value: ethers.utils.parseEther('0.02'),
        gasLimit:'5000000'
    }); 
    await send.wait();

    console.log(`${account} : ${ethers.utils.formatEther(await provider.getBalance(account))}`);
    console.log(`${await wallet.getAddress()} : ${ethers.utils.formatEther(await wallet.getBalance())}`);
    
}
write();