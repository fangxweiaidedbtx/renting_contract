import { Web3, HttpProvider } from 'web3';
var book_fee;
var recovery_fee;
export async function init_function(contract){
    book_fee = getBookFee(contract);
    recovery_fee = getRecoveryFee(contract);
}

/**
 * 获取房源数量
 * @param {object} contract - 智能合约的实例
 */
export async function getPropertyCount(contract) {
  try {
    let count = await contract.methods.propertyCount().call();
    console.log('Property Count:', count);
  return count;

  } catch (error) {
    console.error('Failed to get property count:', error);
  }
}

/**
 * 获取时间锁定期限
 * @param {object} contract - 智能合约的实例
 */
export async function getTimeLock(contract) {
  try {
    let timeLock = await contract.methods.timeLock().call();
    console.log('Time Lock:', timeLock);
  return timeLock;

  } catch (error) {
    console.error('Failed to get time lock:', error);
  }
}

/**
 * 获取预订费用
 * @param {object} contract - 智能合约的实例
 */
export async function getBookFee(contract) {
  try {
    let fee = await contract.methods.book_fee().call();
    console.log('Book Fee:', fee);
  return fee;

  } catch (error) {
    console.error('Failed to get book fee:', error);
  }
}

/**
 * 获取维修费用
 * @param {object} contract - 智能合约的实例
 */
export async function getRecoveryFee(contract) {
  try {
    let fee = await contract.methods.recovery_fee().call();
    console.log('Recovery Fee:', fee);
  return fee;

  } catch (error) {
    console.error('Failed to get recovery fee:', error);
  }
}

/**
 * 获取发布费用
 * @param {object} contract - 智能合约的实例
 */
export async function getPublishFee(contract) {
  try {
    let fee = await contract.methods.publish_fee().call();
    console.log('Publish Fee:', fee);
  return fee;

  } catch (error) {
    console.error('Failed to get publish fee:', error);
  }
}

/**
 * 发布房源信息到智能合约
 * @param {string} contract - 智能合约
 * @param {string} addr - 房源地址
 * @param {number} area - 房源面积
 * @param {number} rent - 房源租金
 * @param {number} publishFee - 发布费用
 */
export async function publishProperty(contract, addr, area, rent, publishFee) {
  try {
    // 发布房源信息的交易
    const estimateGas = await contract.methods.publishProperty(addr, area, rent).estimateGas({ from: contractAddress });
    const transaction = await contract.methods.publishProperty(addr, area, rent).send({ 
      from: contractAddress, 
      value: web3.utils.toWei(publishFee.toString(), 'ether'), 
      gas: estimateGas 
    });

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to publish property:', error);
  }
}

/**
 * 房客支付押金和租金的功能函数
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 * @param {string} hashLock - 哈希锁
 */
export async function rentProperty(contract, propertyId, hashLock) {
  try {
    // 计算总支付金额（租金 + 押金 + 维修费 + 预订费）
    const property = await contract.methods.properties(propertyId).call();
    const rent = property.rent;
    const deposit = property.deposit || rent * 2;
    const totalPayment = rent + deposit + recovery_fee + book_fee;

    // 房客支付押金和租金的交易
    const estimateGas = await contract.methods.rentProperty(propertyId, hashLock).estimateGas({ from: contractAddress });
    const transaction = await contract.methods.rentProperty(propertyId, hashLock).send({ 
      from: contractAddress, 
      value: totalPayment, 
      gas: estimateGas 
    });

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to rent property:', error);
  }
}

/**
 * 房东解锁HTLC的功能函数
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 * @param {string} preimage - 原像
 */
export async function unlockHTLC(contract, propertyId, preimage) {
  try {
    // 房东解锁HTLC的交易
    const estimateGas = await contract.methods.unlockHTLC(propertyId, preimage).estimateGas({ from: contractAddress });
    const transaction = await contract.methods.unlockHTLC(propertyId, preimage).send({ 
      from: contractAddress, 
      gas: estimateGas 
    });

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to unlock HTLC:', error);
  }
}

/**
 * 房客申请退款HTLC合约中的资金
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 */
export async function refundHTLC(contract, propertyId) {
  try {
    // 房客申请退款的交易
    const estimateGas = await contract.methods.refundHTLC(propertyId).estimateGas({ from: contractAddress });
    const transaction = await contract.methods.refundHTLC(propertyId).send({ 
      from: contractAddress, 
      gas: estimateGas 
    });

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to refund HTLC:', error);
  }
}

/**
 * 房客续租并支付下一期租金
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 */
export async function renewLease(contract, propertyId) {
  try {
    // 获取租金金额
    const rentalProperty = await contract.methods.properties(propertyId).call();
    const rent = rentalProperty.rent;

    // 续租的交易
    const estimateGas = await contract.methods.renewLease(propertyId).estimateGas({ from: contractAddress });
    const transaction = await contract.methods.renewLease(propertyId).send({ 
      from: contractAddress, 
      value: rent, 
      gas: estimateGas 
    });

    console.log('Transaction hash:', transaction.transactionHash);
    return transaction;
  } catch (error) {
    console.error('Failed to renew lease:', error);
  }
}

/**
 * 查询房源信息
 * @param {object} contract - 智能合约实例
 * @param {number} propertyId - 房源ID
 */
export async function getProperty(contract, propertyId) {
  try {
    // 查询房源信息
    const property = await contract.methods.getProperty(propertyId).call();
    console.log('Property Details:', property);
    return property;
  } catch (error) {
    console.error('Failed to get property:', error);
  }
}
export { book_fee, recovery_fee };