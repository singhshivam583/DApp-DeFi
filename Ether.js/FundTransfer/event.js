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
    //FILTER TRANSCATIONS BASED ON AMOUNT AND RECEIVERS ACCOUNT
    const address=null;
    const amount=(0.05)*Math.pow(10,18);
    const trans=await contract.filters.transactions(address, amount.toString());  // only string parameter can be passed
    console.log('reading from the smartcontract');
    const transactions=await contract.queryFilter(trans);

    transactions.map((items)=>{
        // console.log(items.args.to,":",(Number(items.args.amount))/Math.pow(10,18),"eth"); 
        console.log(items.args.to,":",(ethers.utils.formatEther(items.args.amount)),"eth");
    });
}
read();