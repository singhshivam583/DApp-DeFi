let Web3= require("web3");

let provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

let web3 =new Web3(provider);

async function sendEthers(){
   await web3.eth.sendTransaction({
        from:"0x9b7E8Dc2459BFb50720186eCA9B9435c240D7745",
        to:"0x91c5439c310073721d197dfA6CD7446673f1bF4F",
        value : web3.utils.toWei("50","ether")
    });
    console.log(`Ether Transfered`);
}
sendEthers();
