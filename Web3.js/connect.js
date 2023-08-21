let Web3= require("web3");

let provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

let web3 =new Web3(provider);

// console.log(web3);

async function getBalance(){
    const weiBalance=await web3.eth.getBalance("0x1ec71F0be5Eaf0a29e768824f22Bfc8609A64D60");
    console.log(`The Balance of the account is: ${weiBalance} Wei`);
    //converting to ether 
    const balanceInEther=(+weiBalance)/Math.pow(10, 18);

    const balanceEther=web3.utils.fromWei(weiBalance,"ether");

    console.log(`The Account has a balance of :${balanceInEther} Ether`);
    console.log(`The Account has a balance of :${balanceEther} Ether`);
}
getBalance();
