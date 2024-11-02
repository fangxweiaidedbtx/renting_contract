# 租房合约	
## 如何使用？

请自行配置geth和nodejs

nodejs 安装地址

[Node.js — 在任何地方运行 JavaScript](https://nodejs.org/zh-cn) 

geth安装地址

https://geth.ethereum.org/downloads



到下载的项目目录下

npm install web3

npm install crypto-js 

如果您是windows系统，则可以运行start_commend.bat以打开服务。

打开https://remix.ethereum.org/，编译合约并且部署。

更改项目中的abi和合约地址

通过geth_dir\geth.exe --datadir "./data" account new 创建新的地址以进行测试



给新用户进行转账

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



