const ethers = require("ethers");

const RPC='https://eth-sepolia.g.alchemy.com/v2/dMLldqTaot-6QCQH4CDx9y_mwoJs5plz';
const provider =new ethers.providers.JsonRpcProvider(RPC);

const contractAddress='0x06F71395b5Ae9705c130A8B39B8a58FE131aa76e';

async function read(){
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
        provider
    );
     const readData=Number(await contract.getterstate());    // Number is used for removing BigNumber error
     console.log("Read data from smartcontract:",readData);
}
read();