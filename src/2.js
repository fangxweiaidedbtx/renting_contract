
import Web3 from 'web3'; 
import { HttpProvider } from 'web3'; 
const web3 = new Web3(new HttpProvider('http://localhost:8545'));
web3.eth.personal.unlockAccount('0x9b7f799aa0c13b3aece687c890577d099d4e11dd', '123456', 30)
  .then(console.log)
  .catch(console.error);