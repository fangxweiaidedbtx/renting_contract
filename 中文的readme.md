# 租房合约	

房屋租赁智能合约是一种基于区块链技术的自动化合同，它能够在满足预设条件时自动执行合同条款。这种智能合约在房屋租赁领域中提供了一种透明、高效且安全的交易方式。通过智能合约，房东和租客之间的交易可以减少中介的参与，降低交易成本，同时提高交易的安全性和信任度。智能合约的自动执行特性确保了一旦条件满足，合同中的条款就会自动执行，无需人工干预。

### 房屋租赁智能合约的功能

房屋租赁智能合约具备以下核心功能：

1. **发布房源信息**：房东可以在区块链上发布房源信息，包括具体位置、价格和租赁条件。
2. **支付押金和租金**：租客通过智能合约支付押金和租金，使用哈希锁和时间锁确保资金安全。
3. **自动续约**：在租约结束时，如果租客希望续约，智能合约可以根据预设条件自动扣除租金，实现自动续约。
4. **退还押金**：租约结束时，如果租客保持公寓状况良好，房东可以通过智能合约自动退还押金。
5. **事件触发**：智能合约中定义了多个事件，用于在特定动作发生时触发，如发布房源、创建租赁合同、解锁合同、退款、续约和退还押金。

## 如何安装本项目

请自行配置geth和nodejs

nodejs 安装地址

[Node.js — 在任何地方运行 JavaScript](https://nodejs.org/zh-cn) 

目前已经在node 版本v22.11.0 成功运行，其他版本未知

geth安装下载地址

https://geth.ethereum.org/downloads

请将压缩包的内容放到geth_dir目录下，详情见geth_dir下的readme.md



到项目目录下

```shell
cd web

npm install 

```

至此，您已经成功安装本项目所需要的依赖。

# 如何运行本项目的例子

## 启动geth服务

如果您是windows系统，则可以运行start_commend.bat以打开服务。

如果您是linux系统，则可以运行start_commend.sh 以打开geth

## 部署智能合约

打开https://remix.ethereum.org/，编译合约并且部署。

请在编译智能合约时，记录下**contract ABI**

在部署智能合约时，注意切换环境（ENVIRONMENT）为**Custom External Http Provider** ，记录下这个合约的地址（**contractAddress** ）

## 更新项目设置文件

请找到web/src/config.js

更改项目中的contractABI 和contractAddress 

## 运行前端交互页面

```shell
cd web
npm run serve
```

现在，您可以体验本项目了。

## 可选项操作

如果您运行我们的例子，你会看到目前的账户有三个账号

0xE85675217431F832Eab73D8F6D90E5eD697267c3  ，这个账号内有足量的余额，并且在进行交易时候，不需要进行解锁操作。

0xeB3c1e58D902828b7912c35BbdC26F65301CC6B6  ，这个账号内有接近10 ether，账户解锁的密码为123

0x2918A703a15D345A65FEb7c8089F2A92E67A096f  ，这个账号内有10 ether，

账户解锁的密码为123

如果您需要添加更多的用户，可以按照如下操作进行，这里以windows的操作为例子。

```shell
cd geth_dir
geth.exe --datadir "./data" account new
```



给新用户进行转账

```shell
cd geth_dir
geth.exe attach
```

```javascript
// 使用这条命令以查看当前有哪些账户
web3.eth.accounts
// 根据您的需要更改从哪个账户传给那个账户，以及转账的数量
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




