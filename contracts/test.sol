// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract RentalContract {
    // 定义房源信息的结构体
    struct RentalProperty {
        string addr;
        uint256 area;
        uint256 rent;
        uint256 deposit;
        address payable landlord;
        address tenant;
        bool isRented;
        bytes32 hashLock;
        uint256 timeLock;
        uint256 nextRentDue; // 下一次租金到期时间
        bool invalid; // 房东是否有恶意行为
    }

    // 映射房源ID到房源信息
    mapping(uint256 => RentalProperty) public properties;
    // 房源ID计数器
    uint256 public propertyCount;
    uint256 public timeLock = 30 days;
    uint256 public book_fee = 100 wei;
    uint256 public recovery_fee = 100 wei;
    uint256 public publish_fee = 100 wei;

    // 发布房源信息的事件
    event PropertyPublished(uint256 propertyId, string addr, uint256 area, uint256 rent);
    // 租房合约创建的事件
    event RentingContractCreated(uint256 propertyId, address tenant, uint256 rent, uint256 timeLock);


    // 发布房源信息的功能函数
    function publishProperty(string memory _addr, uint256 _area, uint256 _rent) public payable{
        require(msg.value == publish_fee, "Incorrect publish fee amount");
        require(_rent > 0, "Rent must be greater than zero");
        propertyCount++;
        properties[propertyCount] = RentalProperty({
            addr: _addr,
            area: _area,
            rent: _rent,
            landlord: payable(msg.sender),
            tenant: address(0),
            isRented: false,
            deposit : 2*_rent,
            hashLock: 0x0,
            timeLock: 0,
            nextRentDue: 0,
            invalid : false
        });
        emit PropertyPublished(propertyCount, _addr, _area, _rent);
    }

    // 房客支付押金和租金的功能函数
    function rentProperty(uint256 _propertyId, bytes32 _hashLock ) public payable {
         // 时间锁定期限为30天
        RentalProperty storage property = properties[_propertyId];
        require(property.invalid == false, "Property has been reported as invalid");
        require(!property.isRented, "Property is already rented");
        require(msg.value == property.rent + property.deposit + recovery_fee + book_fee,"Incorrect payment amount "); // 押金，第一个月租金，维修费
        property.isRented = true;
        property.tenant = msg.sender;
        property.hashLock = _hashLock;
        property.timeLock = block.timestamp + timeLock;
        property.nextRentDue = block.timestamp + 30 days; // 假设按月续租
        emit RentingContractCreated(_propertyId, msg.sender, property.rent, timeLock);
    }

    function test(bytes32 _hash) public {
        require(1==1, "test");
    }

}
