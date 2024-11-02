let contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "addr",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "area",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rent",
				"type": "uint256"
			}
		],
		"name": "PropertyPublished",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timeLock",
				"type": "uint256"
			}
		],
		"name": "RentingContractCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "book_fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "properties",
		"outputs": [
			{
				"internalType": "string",
				"name": "addr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "area",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deposit",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "landlord",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isRented",
				"type": "bool"
			},
			{
				"internalType": "bytes32",
				"name": "hashLock",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "timeLock",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nextRentDue",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "invalid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "propertyCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_addr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_area",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rent",
				"type": "uint256"
			}
		],
		"name": "publishProperty",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publish_fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recovery_fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_hashLock",
				"type": "bytes32"
			}
		],
		"name": "rentProperty",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "test",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "timeLock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

import Web3 from 'web3'; 
import { HttpProvider } from 'web3'; 

// 使用新的 Web3 构造函数和 HttpProvider 创建实例
const web3 = new Web3(new HttpProvider('http://localhost:8545'));

const contractAddress = '0xC01322C31F83C6720009B89A31e56b72dCeBEB59';

const contract = new web3.eth.Contract(contractABI, contractAddress,{from:"0x9B7f799aA0C13b3aEce687C890577d099d4E11DD"});

async function publishProperty(contract, addr, area, rent,usr_addr,publishfee) {

    try {
      // 发布房源信息的交易
      const send_data = { 
        from:usr_addr , 
        // value: Web3.utils.toWei(10000100, "wei"),
        value: 10000100,
  
        gasPrice: Web3.utils.toWei(10000000, 'wei'),
        gas: 100000000
      };
      console.log('send_data:',send_data);
      const transaction = await contract.methods.publishProperty(addr, area, rent).send();
  
      console.log('Transaction hash:', transaction.transactionHash);
      return transaction;
    } catch (error) {
      console.error('Failed to publish property:', error);
    }
}
  
async function mytest(contract,usr_addr){
    try {
        // 发布房源信息的交易
        const send_data = { 
          from:usr_addr , 
          value: 10000100,
    
          gasPrice: Web3.utils.toWei(10000000, 'wei'),
          gas: 100000000
        };
        console.log('send_data:',send_data);
        const transaction = await contract.methods.test().send();
    
        console.log('Transaction hash:', transaction.transactionHash);
        return transaction;
      } catch (error) {
        console.error('Failed to publish property:', error);
      }
}
// console.log(tx);
