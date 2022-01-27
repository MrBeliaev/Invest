// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const testtoken = await TestToken.deploy();
  await testtoken.deployed();
  console.log("TestToken deployed to:", testtoken.address);
  const InvestExTRC20 = await hre.ethers.getContractFactory("InvestExTRC20");
  const investextrc20 = await InvestExTRC20.deploy(testtoken.address);
  await investextrc20.deployed();
  console.log("investextrc20 deployed to:", investextrc20.address);
  const NewToken = await hre.ethers.getContractFactory("NewToken");
  const newtoken = await NewToken.deploy();    
  await newtoken.deployed();
  console.log("NewToken deployed to:", newtoken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
