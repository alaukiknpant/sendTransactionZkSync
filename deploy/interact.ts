import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";
import { Provider } from "zksync-ethers";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0x111C3E89Ce80e62EE88318C2804920D4c96f92bb";
if (!CONTRACT_ADDRESS)
  throw "⛔️ Provide address of the contract to interact with!";

// An example of a script to interact with the contract
export default async function () {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact("Greeter");

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet() // Interact with the contract on behalf of this wallet
  );

  // Run contract read function
  const response = await contract.greet();
  console.log(`Current message is: ${response}`);

  // Run contract write function
  const transaction = await contract.setGreeting("Hello people!");
  console.log(`Transaction hash of setting new message: ${transaction.hash}`);

  // Wait until transaction is processed
  await transaction.wait();

  // Read message after transaction
  console.log(`The message now is: ${await contract.greet()}`);

  var w1 = getWallet();

  const data2 = contract.interface.encodeFunctionData("setGreeting", [
    "hey hey hey",
  ]);
  console.log(data2);
  var tx: ethers.TransactionRequest = {
    // type: utils.EIP712_TX_TYPE,
    to: CONTRACT_ADDRESS,
    gasLimit: 2100000,
    data: data2,
  };
  w1 = w1.connect(getProvider());
  const resp = await w1.sendTransaction(tx);
  console.log("waiting");
  await resp.wait();
  // Read message after transaction
  console.log(`The message now is: ${await contract.greet()}`);
}

export const getProvider = () => {
  const rpcUrl = hre.network.config.url;
  if (!rpcUrl)
    throw `⛔️ RPC URL wasn't found in "${hre.network.name}"! Please add a "url" field to the network config in hardhat.config.ts`;

  // Initialize zkSync Provider
  const provider = new Provider(rpcUrl);

  return provider;
};
