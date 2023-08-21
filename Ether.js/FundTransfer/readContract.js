const ethers = require("ethers");
const transfer=require("./transsfer.json");

const RPC='https://eth-sepolia.g.alchemy.com/v2/dMLldqTaot-6QCQH4CDx9y_mwoJs5plz';
const provider =new ethers.providers.JsonRpcProvider(RPC);

const contractAddress='0x56Aedf2acB9C5028429e5ee0E72af70Fcf1EFBB3';
const ABI=transfer.abi;

async function read(){

    const contract=new ethers.Contract(
        contractAddress,
        ABI,
        provider
    );
     const readData=await contract.callOwner();
     console.log("Owner's Address is:",readData);
}
read();