

import Web3 from 'web3'; 
import { HttpProvider } from 'web3'; 
import * as Functions from './functions.js';

// 使用新的 Web3 构造函数和 HttpProvider 创建实例
const web3 = new Web3(new HttpProvider('http://localhost:8545'));

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
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			}
		],
		"name": "ContractRefunded",
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
				"name": "landlord",
				"type": "address"
			}
		],
		"name": "ContractUnlocked",
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
				"name": "deposit",
				"type": "uint256"
			}
		],
		"name": "DepositReturned",
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
				"name": "nextDueDate",
				"type": "uint256"
			}
		],
		"name": "LeaseRenewed",
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
		"inputs": [],
		"name": "getAllProperties",
		"outputs": [
			{
				"components": [
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
				"internalType": "struct RentalContract.RentalProperty[]",
				"name": "",
				"type": "tuple[]"
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
			}
		],
		"name": "getProperty",
		"outputs": [
			{
				"components": [
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
				"internalType": "struct RentalContract.RentalProperty",
				"name": "",
				"type": "tuple"
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
			}
		],
		"name": "refundHTLC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "renewLease",
		"outputs": [],
		"stateMutability": "payable",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "returnDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_preimage",
				"type": "string"
			}
		],
		"name": "unlockHTLC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractAddress = '0x2c2f93e0aBE5383386D857FB4ee813f6D06138A8';

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Functions.init_function(contract);



// let tx =await Functions.publishProperty(contract,'岭南新村4',100,1000,'0xe85675217431f832eab73d8f6d90e5ed697267c3');
// let res = await web3.eth.personal.unlockAccount('0xeb3c1e58d902828b7912c35bbdc26f65301cc6b6','123',600);
// let secert_key = 'hello world';
// let hash_lock = await Functions.hash256(secert_key);
// // console.log(hash_lock);
let tx2 = await Functions.rentProperty(contract,1,'0xf1eeaec73d2efec32e94842f0f42b643ec1511ca4b14e37b2a9c79bf4dc136ad','0xeb3c1e58d902828b7912c35bbdc26f65301cc6b6');
console.log(tx2);


// let properties = await Functions.getProperty(contract,1)
// let properties = await Functions.getAllProperties(contract)
// console.log(properties);