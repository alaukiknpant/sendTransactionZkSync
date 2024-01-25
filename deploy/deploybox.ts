import { Wallet } from "zksync-ethers";
import { getWallet } from "./utils";
// import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// import * as hre from "hardhat";

export default async function () {
  const contractName = "Box";
  console.log("Deploying " + contractName + "...");

  // mnemonic for local node rich wallet
  //   const testMnemonic = "stuff slice staff easily soup parent arm payment cotton trade scatter struggle";
  //   const zkWallet = Wallet.fromMnemonic(testMnemonic);
  const zkWallet = getWallet();

  const deployer = new Deployer(hre, zkWallet);

  const contract = await deployer.loadArtifact(contractName);
  const box = await hre.zkUpgrades.deployProxy(
    deployer.zkWallet,
    contract,
    [42],
    { initializer: "initialize" }
  );

  await box.waitForDeployment();
  console.log(contractName + " deployed to:", await box.getAddress());

  box.connect(zkWallet);
  const value = await box.retrieve();
  console.log("Box value is: ", value);
}
