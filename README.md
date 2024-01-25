# zkSync Upgradable contract setup

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli) and follows examples on upgradable [contracts](https://docs.zksync.io/build/tooling/hardhat/hardhat-zksync-upgradable.html#upgrade-beacon-proxy)

## Steps
- `echo WALLET_PRIVATE_KEY=7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110 > .env`: create a local rich wallet config
- `era_test_node run`: Run the local node.
- `yarn compile`: Compiles the contracts
- `yarn deploy`: Interacts with the deployed contract using `/deploy/interact.ts`.
- `yarn deploy:box`: Tests the contracts.


## Error
```
/upgrade-example$ yarn deploy:box
yarn run v1.22.21
warning ../../package.json: No license field
$ hardhat deploy-zksync --script deploybox.ts
Deploying Box...
Implementation contract was deployed to 0x65C899B5fb8Eb9ae4da51D67E1fc417c7CB7e964
An unexpected error occurred:

Error: incorrect number of arguments to constructor
    at ContractFactory.getDeployTransaction (/home/lowkey_anp/code/upgrade-example/node_modules/ethers/src.ts/contract/factory.ts:87:19)
    at ContractFactory.getDeployTransaction (/home/lowkey_anp/code/upgrade-example/node_modules/zksync-ethers/build/src/contract.js:56:39)
    at ContractFactory.deploy (/home/lowkey_anp/code/upgrade-example/node_modules/ethers/src.ts/contract/factory.ts:105:31)
    at ContractFactory.deploy (/home/lowkey_anp/code/upgrade-example/node_modules/zksync-ethers/build/src/contract.js:126:38)
    at deploy (/home/lowkey_anp/code/upgrade-example/node_modules/@matterlabs/hardhat-zksync-upgradable/src/proxy-deployment/deploy.ts:13:44)
    at /home/lowkey_anp/code/upgrade-example/node_modules/@matterlabs/hardhat-zksync-upgradable/src/proxy-deployment/deploy-proxy-admin.ts:18:70
    at resumeOrDeploy (/home/lowkey_anp/code/upgrade-example/node_modules/@openzeppelin/upgrades-core/src/deployment.ts:76:30)
    at async /home/lowkey_anp/code/upgrade-example/node_modules/@matterlabs/hardhat-zksync-upgradable/src/core/impl-store.ts:48:29
    at async Manifest.lockedRun (/home/lowkey_anp/code/upgrade-example/node_modules/@matterlabs/hardhat-zksync-upgradable/src/core/manifest.ts:150:20)
    at async fetchOrDeployGeneric (/
```