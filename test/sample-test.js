const { expect } = require("chai");
const { ethers } = require("hardhat");
const Test = require("mocha/lib/test");

describe("InvestExTRC20", function () {
    var testtoken;
    var investextrc20;
    var owner;  
    var admin;
    it("Deploy", async function () {
        TestToken = await hre.ethers.getContractFactory("TestToken");
        testtoken = await TestToken.deploy();    
        InvestExTRC20 = await ethers.getContractFactory("InvestExTRC20");
        investextrc20 = await InvestExTRC20.deploy(testtoken.address);
        [...addrs] = await ethers.getSigners();
        owner = addrs[0];
        admin = addrs[1];        
        });
    it("setAdmin", async function () {
        await investextrc20.connect(owner).setAdmin(admin.address, true);
        console.log("Admin:", await investextrc20.Admins(admin.address));
        });
    it("depositTokens owner => user2", async function () {
        await testtoken.connect(owner).approve(investextrc20.address, 10000000000);
        await investextrc20.connect(owner).depositTokens(2000000000, addrs[2].address);
        let user2 = await investextrc20.Users(addrs[2].address);
        console.log("depositAmount:", user2.depositAmount.toString());
        console.log("amountForWithdraw:", user2.amountForWithdraw.toString());
        console.log("withdrawed:", user2.withdrawed.toString());
        let balanceinvestextrc20 = await testtoken.balanceOf(investextrc20.address);
        console.log("investextrc20 balance:", balanceinvestextrc20.toString());
        });
    it("setUserWithdrawAmount user2", async function () {
        await investextrc20.connect(admin).setUserWithdrawAmount(2000000000, addrs[2].address);    
        user2 = await investextrc20.Users(addrs[2].address);
        console.log("depositAmount:", user2.depositAmount.toString());
        console.log("amountForWithdraw:", user2.amountForWithdraw.toString());
        console.log("withdrawed:", user2.withdrawed.toString());
        balanceinvestextrc20 = await testtoken.balanceOf(investextrc20.address);
        console.log("investextrc20 balance:", balanceinvestextrc20.toString()); 
        });
    it("withdraw user2 => user2", async function () {
        await investextrc20.connect(addrs[2]).withdraw(2000000000, addrs[2].address);
        user2 = await investextrc20.Users(addrs[2].address);
        console.log("depositAmount:", user2.depositAmount.toString());
        console.log("amountForWithdraw:", user2.amountForWithdraw.toString());
        console.log("withdrawed:", user2.withdrawed.toString());
        balanceinvestextrc20 = await testtoken.balanceOf(investextrc20.address);
        console.log("investextrc20 balance:", balanceinvestextrc20.toString());
        });
    it("depositTokens user2 => user2", async function () {
        await testtoken.connect(addrs[2]).approve(investextrc20.address, 10000000000);
        await investextrc20.connect(addrs[2]).depositTokens(1000000000, addrs[2].address);
        user2 = await investextrc20.Users(addrs[2].address);
        console.log("depositAmount:", user2.depositAmount.toString());
        console.log("amountForWithdraw:", user2.amountForWithdraw.toString());
        console.log("withdrawed:", user2.withdrawed.toString());
        balanceinvestextrc20 = await testtoken.balanceOf(investextrc20.address);
        console.log("investextrc20 balance:", balanceinvestextrc20.toString());
        balanceuser2 = await testtoken.balanceOf(addrs[2].address)
        console.log("user2 balance:", balanceuser2.toString()); 
        });
    it("setUserWithdrawAmount user2", async function () {
        await investextrc20.connect(admin).setUserWithdrawAmount(1000000000, addrs[2].address)
        user2 = await investextrc20.Users(addrs[2].address);
        console.log("depositAmount:", user2.depositAmount.toString());
        console.log("amountForWithdraw:", user2.amountForWithdraw.toString());
        console.log("withdrawed:", user2.withdrawed.toString());
        balanceinvestextrc20 = await testtoken.balanceOf(investextrc20.address);
        console.log("investextrc20 balance:", balanceinvestextrc20.toString());
        balanceuser2 = await testtoken.balanceOf(addrs[2].address)
        console.log("user2 balance:", balanceuser2.toString()); 
        });
    it("withdraw user2 => user3", async function () {
        await investextrc20.connect(addrs[2]).withdraw(1000000000, addrs[3].address)
        user2 = await investextrc20.Users(addrs[2].address);
        console.log("depositAmount:", user2.depositAmount.toString());
        console.log("amountForWithdraw:", user2.amountForWithdraw.toString());
        console.log("withdrawed:", user2.withdrawed.toString());
        balanceinvestextrc20 = await testtoken.balanceOf(investextrc20.address);
        console.log("investextrc20 balance:", balanceinvestextrc20.toString());
        balanceuser3 = await testtoken.balanceOf(addrs[3].address)
        console.log("user3 balance:", balanceuser3.toString());
    });     
    it("setTokenAddress", async function () {    
        addrTest = await investextrc20.tokenAddress();
        console.log(addrTest);
        NewToken = await hre.ethers.getContractFactory("NewToken");
        newtoken = await NewToken.deploy();            
        await investextrc20.connect(owner).setTokenAddress(newtoken.address);
        addrNew = await investextrc20.tokenAddress();
        console.log(addrNew);
    })
})
