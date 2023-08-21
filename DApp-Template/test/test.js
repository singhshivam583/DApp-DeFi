const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("Hello", async function () {
    it("Return the number given by user", async function() {
        const Testing=await ethers.getContractFactory("Hello");
        const testing=await Testing.deploy();
        await testing.deployed();

        expect(await testing.settrstate()).to.equal(10);

        const setTesting=await testing.setTesting
    });
});
