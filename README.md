# Rental Contract

A smart contract for housing rental is an automated contract based on blockchain technology that can automatically execute contract terms when preset conditions are met. This smart contract provides a transparent, efficient, and secure transaction method in the field of housing rental. Through smart contracts, transactions between landlords and tenants can reduce the involvement of intermediaries, reduce transaction costs, and improve the security and trustworthiness of transactions. The automatic execution feature of smart contracts ensures that once the conditions are met, the terms in the contract will be executed automatically without manual intervention.

### Functions of the Housing Rental Smart Contract

The housing rental smart contract has the following core functions:

1. **Posting Rental Information**: Landlords can post rental information on the blockchain, including specific location, price, and rental conditions.
2. **Payment of Deposit and Rent**: Tenants can pay deposits and rent through smart contracts, using hash locks and time locks to ensure the security of funds.
3. **Automatic Renewal**: At the end of the lease period, if the tenant wishes to renew, the smart contract can automatically deduct rent according to preset conditions to achieve automatic renewal.
4. **Refund of Deposit**: At the end of the lease, if the tenant maintains the apartment in good condition, the landlord can automatically refund the deposit through the smart contract.
5. **Event Triggering**: The smart contract defines multiple events to trigger when specific actions occur, such as posting rental information, creating a rental contract, unlocking a contract, refunding, renewing a lease, and refunding deposits.

## How to Install This Project

Please configure geth and nodejs on your own.

Node.js installation address:

[Node.js — Run JavaScript Everywhere](https://nodejs.org/en/)

The project has been successfully run on node version v22.11.0, other versions are unknown.

Geth installation download address:

[Geth Downloads](https://geth.ethereum.org/downloads)

Please put the contents of the compressed package into the geth_dir directory, see the readme.md in geth_dir for details.

Go to the project directory:

```shell
cd web

npm install 
```

You have successfully installed the dependencies required for this project.

## How to Run Examples of This Project

### Start Geth Service

If you are using a Windows system, you can run the service by running start_commend.bat.

If you are using a Linux system, you can run start_commend.sh to start geth.

### Deploy Smart Contract

Open [Remix IDE](https://remix.ethereum.org/), compile the contract and deploy it.

Please record the **contract ABI** when compiling the smart contract.

When deploying the smart contract, switch the environment (ENVIRONMENT) to **Custom External Http Provider**, and record the contract address (**contractAddress**).

### Update Project Configuration File

Please find web/src/config.js

Change the contractABI and contractAddress in the project.

### Run the Frontend Interaction Page

```shell
cd web
npm run serve
```

Now, you can experience this project.

## Optional Operations

If you run our example, you will see that there are currently three accounts:

0xE85675217431F832Eab73D8F6D90E5eD697267c3, this account has enough balance and does not require unlocking for transactions.

0xeB3c1e58D902828b7912c35BbdC26F65301CC6B6, this account has nearly 10 ether, and the account unlock password is 123.

0x2918A703a15D345A65FEb7c8089F2A92E67A096f, this account has 10 ether,

Account unlock password is 123.

If you need to add more users, you can follow these operations, here is an example for Windows.

```shell
cd geth_dir
geth.exe --datadir "./data" account new
```

Transfer to a new user

```shell
cd geth_dir
geth.exe attach
```

```javascript
// Use this command to see the current accounts
web3.eth.accounts
// Change from which account to which account, and the amount of transfer as needed
eth.sendTransaction({

  from: "0xe85675217431f832eab73d8f6d90e5ed697267c3",

  to: "0xeb3c1e58d902828b7912c35bbdc26f65301cc6b6",

  value: web3.toWei(10, "ether")

});

eth.sendTransaction({

  from: "0xe85675217431f832eab73d8f6d90e5ed697267c3",

  to: "0x2918a703a15d345a65feb7c8089f2a92e67a096f",

  value: web3.toWei(10, "ether")

});
```
