const ethers = require("ethers");

const RPC='https://eth-sepolia.g.alchemy.com/v2/dMLldqTaot-6QCQH4CDx9y_mwoJs5plz';
account='0x067eB811C35e4F5aB59CfBa8410Dc811CCbB1166';
const privateKey='64f7db72fb1100c5e0b49a8adfd75147f3e2fd35db0a4a62ad0f01be81a36563';
const provider =new ethers.providers.JsonRpcProvider(RPC);
const wallet =new ethers.Wallet(privateKey, provider);   //signer

const contractAddress='0x06F71395b5Ae9705c130A8B39B8a58FE131aa76e';

async function write(){
    const ABI=[
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "setterstate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getterstate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "setterlocal",
            "outputs": [],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "x",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const contract=new ethers.Contract(
        contractAddress,
        ABI,
        wallet
    );
    const balance=await provider.getBalance(account);
    console.log("Balance:",ethers.utils.formatEther(balance));

    const writeData=await contract.setterstate(150); 
    // await writeData.wait();
    console.log("Data changed successfully",)
}
write();