// 0xE51CDE4eD65C2564d8246b48927e431C0B34DAd5 contract address

const Contract =require("web3-eth-contract");
Contract.setProvider("HTTP://127.0.0.1:7545")
async function writeContract(){
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
    const contractAddress="0xE51CDE4eD65C2564d8246b48927e431C0B34DAd5";
    const contract =new Contract(ABI,contractAddress);
    const data =await contract.methods.setterstate(20).send({from: "0xD8cdF512B679b2571F1Ff5fE136303Ddc3FC9Da6"});
    // console.log("data:",data);
}
writeContract();


