// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Dao{

    struct Proposal{
        uint Id;
        string description;
        uint amount;
        address payable receipient;
        uint votes;
        uint end;
        bool isExecuted;
    }

    mapping(address=>bool) private isInvestor;
    mapping(address=>uint)public numOfshares;
    mapping(address=>mapping(uint=>bool)) public isVoted;
    address[] public investorsList;
    mapping(uint=>Proposal) public proposals;

    uint public totalShares;
    uint public availableFunds;
    uint public contributionTimeEnd;
    uint public nextProposalId;
    uint public voteTime;
    uint public quorum;
    address public manager;

    constructor(uint _contributionTimeEnd,uint _voteTime,uint _quorum){
        require(_quorum>0 && _quorum<100,"Not Valid Value");
        contributionTimeEnd=block.timestamp+_contributionTimeEnd;
        voteTime=_voteTime;
        _quorum=quorum;
        manager=msg.sender;
    }

    modifier onlyInvestor(){
        require(isInvestor[msg.sender]==true,"You are not an Investor");
        _;
    }

    modifier onlyManager(){
        require(manager==msg.sender,"You are not a Manager");
        _;
    }

    function contribution() public payable {
        require(contributionTimeEnd>=block.timestamp,"Contribution Time Ended");
        require(msg.value>0,"Send more than 0 ether");
        isInvestor[msg.sender]=true;
        numOfshares[msg.sender]=numOfshares[msg.sender]+msg.value;
        totalShares+=msg.value;
        availableFunds+=msg.value;
        investorsList.push(msg.sender);
    }

    function reedemShare(uint amount) public onlyInvestor(){
        require(numOfshares[msg.sender]>=amount,"You dont have enough shares");
        require(availableFunds>=amount,"Not enough Funds");
        numOfshares[msg.sender]-=amount;
        if(numOfshares[msg.sender]==0){
            isInvestor[msg.sender]=false;
        }
        else{
            availableFunds-=amount;
            payable(msg.sender).transfer(amount);
        }
    }

    function transfer(uint amount,address to) public onlyInvestor(){
        require(numOfshares[msg.sender]>=amount,"You dont have enough shares");
        require(availableFunds>=amount,"Not enough Funds");
        numOfshares[msg.sender]-=amount;
        if(numOfshares[msg.sender]==0){
            isInvestor[msg.sender]=false;
        }
        else{
            numOfshares[to]+=amount;
            isInvestor[to]=true;
            investorsList.push(to);   
        }
    }

    function createProposal(string calldata description,uint amount,address payable receipient) public onlyManager() {
        require(availableFunds>=amount,"Not enough funds");
        proposals[nextProposalId]=Proposal(nextProposalId,description,amount,
        receipient,0,block.timestamp+voteTime,false);
        nextProposalId++;
    }

    function voteProposal(uint proposalId) public onlyInvestor(){
        Proposal storage proposal=proposals[proposalId];
        require(isVoted[msg.sender][proposalId]==false,"You have Voted");
        require(proposal.end>=block.timestamp,"Voting time ended");
        require(proposal.isExecuted==false,"It is already executed");
        proposal.votes=numOfshares[msg.sender];  
    }

    function executeProposal(uint proposalId) public onlyManager(){
        Proposal storage proposal=proposals[proposalId];
        require(((proposal.votes*100)/totalShares)>=quorum,"Majority does not support");
        proposal.isExecuted=true;
        availableFunds-=proposal.amount;
        _transfer(proposal.amount,proposal.receipient);
    }

    function _transfer(uint amount,address payable receipient) private{
        receipient.transfer(amount); 
    }

    function ProposalList() public view returns(Proposal[] memory){
        Proposal[] memory arr= new Proposal[](nextProposalId-1);
        for(uint i=0;i<nextProposalId;i++){
            arr[i]=proposals[i];
        }
        return arr;
    }
}