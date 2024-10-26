pragma solidity ^0.8.0;

// 这是一个租房合约的第一阶段，订房功能的实现
// 主要的逻辑：
// 1. 房东发布房源信息，包括房屋地址、面积、租金、房东信息等
// 2. 房客通过给房东一个包含了hash锁的以太坊货币（包含押金，第一个月的租金，一个固定的维修费用），并且这个以太坊货币还加了时间锁，
// 3.若房东未将房屋出租给房客，时间锁到时会自动解锁，将租金反回给租客
// 4.若房东将房屋出租给房客，则房客可以将hash锁的秘钥给房东，房东解锁后获得以太坊货币

//详细的步骤与逻辑
// ### 1. 定义房源信息的数据结构
// - **房源信息**：首先，你需要定义一个数据结构来存储房源的详细信息，包括房屋地址、面积、租金、房东信息等。这个数据结构将作为智能合约中存储房源信息的基础。
// ### 2. 智能合约的初始化
// - **合约设置**：在智能合约中，你需要初始化一个映射或数组来管理多个房源信息。此外，还需要定义一些全局变量，比如合约拥有的以太坊总额、已出租的房源列表等。
// ### 3. 发布房源信息
// - **房东操作**：房东通过调用智能合约的一个函数来发布房源信息。这个函数需要验证房东的身份，并收集房源的详细信息，然后将这些信息存储在合约中。
// ### 4. 房客支付押金和租金
// - **房客操作**：房客选择房源后，需要通过智能合约支付押金、第一个月的租金和一个固定的维修费用。这笔支付将被锁定在一个HTLC中。
// - **HTLC创建**：在房客支付时，智能合约会创建一个哈希时间锁合约（HTLC），其中包含房客支付的以太坊货币。这个HTLC将使用一个哈希锁来确保资金的安全，并且设置一个时间锁，如果在规定时间内没有解锁，资金将自动退还给房客。
// ### 5. 条件检验
// - **时间锁检验**：智能合约需要检查时间锁是否已经到期。如果到期，合约应允许房客触发退款机制。
// - **哈希锁检验**：当房东想要解锁资金时，智能合约需要验证房客提供的秘钥是否与之前设置的哈希锁匹配。
// ### 6. 房东解锁HTLC
// - **房东操作**：如果房东同意出租房屋，房客将哈希锁的秘钥提供给房东，房东使用这个秘钥来请求智能合约解锁HTLC，从而获得房客支付的以太坊货币。
// ### 7. 时间锁到期自动退款
// - **自动退款机制**：如果房东在规定时间内没有解锁HTLC，智能合约将自动触发退款流程，将资金退还给房客。
// ### 8. 租赁状态管理
// - **租赁状态跟踪**：智能合约需要跟踪每个房源的租赁状态，包括是否已出租、租赁是否结束等。这可以通过在房源信息结构中添加状态字段来实现。
// ### 9. 安全性和合规性检查
// - **安全措施**：在实现上述逻辑时，需要考虑合约的安全性，比如防止重入攻击、确保资金安全等。
// - **合规性**：确保智能合约的执行符合当地的法律法规，比如租赁合同的法律要求、资金处理的合规性等。
// ### 10. 用户界面和交互设计
// - **前端集成**：虽然这部分不涉及智能合约代码，但为了使房客和房东能够与智能合约交互，你需要设计一个用户友好的前端界面，允许用户发布房源、支付租金、请求退款等。
// SPDX-License-Identifier: MIT

contract RentalContract {
    // 定义房源信息的结构体
    struct RentalProperty {
        string addr;
        uint256 area;
        uint256 rent;
        address payable landlord;
        bool isRented;
        bytes32 hashLock;
        uint256 timeLock;
    }

    // 映射房源ID到房源信息
    mapping(uint256 => RentalProperty) public properties;
    // 房源ID计数器
    uint256 public propertyCount;

    // 发布房源信息的事件
    event PropertyPublished(uint256 propertyId, string addr, uint256 area, uint256 rent);
    // 租房合约创建的事件
    event RentingContractCreated(uint256 propertyId, address indexed tenant, uint256 rent, uint256 timeLock);
    // 合约解锁的事件
    event ContractUnlocked(uint256 propertyId, address indexed landlord);
    // 合约退款的事件
    event ContractRefunded(uint256 propertyId, address indexed tenant);

    // 构造函数
    constructor() {
        // 初始化合约时无需特殊操作
    }

    // 发布房源信息的功能函数
    function publishProperty(string memory _addr, uint256 _area, uint256 _rent) public {
        require(_rent > 0, "Rent must be greater than zero");
        propertyCount++;
        properties[propertyCount] = RentalProperty({
            addr: _addr,
            area: _area,
            rent: _rent,
            landlord: payable(msg.sender),
            isRented: false,
            hashLock: 0x0,
            timeLock: 0
        });
        emit PropertyPublished(propertyCount, _addr, _area, _rent);
    }

    // 房客支付押金和租金的功能函数
    function rentProperty(uint256 _propertyId, bytes32 _hashLock, uint256 _timeLock) public payable {
        RentalProperty storage property = properties[_propertyId];
        require(!property.isRented, "Property is already rented");
        require(msg.value == property.rent + property.rent + 1 ether, "Incorrect payment amount"); // 押金，第一个月租金，维修费
        property.isRented = true;
        property.hashLock = _hashLock;
        property.timeLock = block.timestamp + _timeLock;
        emit RentingContractCreated(_propertyId, msg.sender, property.rent, _timeLock);
    }

    // 房东解锁HTLC的功能函数
    function unlockHTLC(uint256 _propertyId, bytes32 _preimage) public {
        RentalProperty storage property = properties[_propertyId];
        require(property.isRented, "Property is not rented");
        require(!property.isRented || block.timestamp >= property.timeLock, "Time lock has not expired");
        require(keccak256(abi.encodePacked(_preimage)) == property.hashLock, "Invalid preimage");
        
        // 将资金转给房东
        property.landlord.transfer(address(this).balance);
        emit ContractUnlocked(_propertyId, property.landlord);
    }

    // 时间锁到期自动退款的功能函数
    function refundHTLC(uint256 _propertyId) public {
        RentalProperty storage property = properties[_propertyId];
        require(property.isRented, "Property is not rented");
        require(block.timestamp >= property.timeLock, "Time lock has not expired");
        require(address(this).balance >= property.rent + property.rent + 1 ether, "Contract balance is insufficient");

        // 将资金退还给房客
        payable(msg.sender).transfer(address(this).balance);
        emit ContractRefunded(_propertyId, msg.sender);
    }
}