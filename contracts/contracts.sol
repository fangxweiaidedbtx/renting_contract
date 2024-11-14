// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalContract {
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
        uint256 nextRentDue; 
        bool invalid; 
        string contactInformation;
    }

    mapping(uint256 => RentalProperty) public properties;
    uint256 public propertyCount;
    uint256 public timeLock = 30 days;
    uint256 public book_fee = 100 wei;
    uint256 public recovery_fee = 100 wei;
    uint256 public publish_fee = 100 wei;

    // 发布房源信息的事件
    event PropertyPublished(
        uint256 propertyId,
        string addr,
        uint256 area,
        uint256 rent
    );
    // 租房合约创建的事件
    event RentingContractCreated(
        uint256 propertyId,
        address tenant,
        uint256 rent,
        uint256 timeLock
    );
    // 合约解锁的事件
    event ContractUnlocked(uint256 propertyId, address landlord);
    // 合约退款的事件
    event ContractRefunded(uint256 propertyId, address tenant);
    event LeaseRenewed(
        uint256 propertyId,
        address tenant,
        uint256 rent,
        uint256 nextDueDate
    );
    event DepositReturned(uint256 propertyId, address tenant, uint256 deposit);

    // 发布房源信息的功能函数
    function publishProperty(
        string memory _addr,
        uint256 _area,
        uint256 _rent,
        string memory _contactIinformation
    ) public payable {
        require(msg.value == publish_fee, "Incorrect publish fee amount");
        require(_rent > 0, "Rent must be greater than zero");
        propertyCount++;
        properties[propertyCount] = RentalProperty({
            addr: _addr,
            area: _area,
            rent: _rent,
            landlord: payable(msg.sender),
            tenant: address(0),
            contactInformation: _contactIinformation,
            isRented: false,
            deposit: 2 * _rent,
            hashLock: 0x0,
            timeLock: 0,
            nextRentDue: 0,
            invalid: false
        });
        emit PropertyPublished(propertyCount, _addr, _area, _rent);
    }

    // 房客支付押金和租金的功能函数
    function rentProperty(
        uint256 _propertyId,
        bytes32 _hashLock
    ) public payable {
        RentalProperty storage property = properties[_propertyId];
        require(
            property.invalid == false,
            "Property has been reported as invalid"
        );
        require(!property.isRented, "Property is already rented");
        require(
            msg.value ==
                property.rent + property.deposit + recovery_fee + book_fee,
            "Incorrect payment amount "
        );
        property.isRented = true;
        property.tenant = msg.sender;
        property.hashLock = _hashLock;
        property.timeLock = block.timestamp + timeLock;
        property.nextRentDue = block.timestamp + 30 days;
        emit RentingContractCreated(
            _propertyId,
            msg.sender,
            property.rent,
            timeLock
        );
    }

    // 房东解锁HTLC的功能函数
    function unlockHTLC(uint256 _propertyId, string memory _preimage) public {
        RentalProperty storage property = properties[_propertyId];
        require(property.hashLock != 0x0, "Hash lock must not be zero");
        require(property.isRented, "Property is not rented");
        require(msg.sender == property.landlord, "Only landlord can unlock");
        require(
            sha256(bytes(_preimage)) == property.hashLock,
            "Invalid preimage"
        );
        property.landlord.transfer(book_fee + property.rent);
        property.hashLock = 0x0;
        property.timeLock = 0;
        emit ContractUnlocked(_propertyId, msg.sender);
    }

    // 时间锁到期自动退款的功能函数
    function refundHTLC(uint256 _propertyId) public {
        RentalProperty storage property = properties[_propertyId];
        require(property.isRented, "Property is not rented");
        require(property.tenant == msg.sender, "Only tenant can refund");
        require(
            block.timestamp >= property.timeLock,
            "Time lock has not expired"
        );
        require(
            address(this).balance >=
                property.rent + property.deposit + recovery_fee / 2,
            "Contract balance is insufficient"
        );

        payable(property.tenant).transfer(property.rent * 2 + recovery_fee / 2);
        property.isRented = false;
        property.hashLock = 0x0;
        property.timeLock = 0;
        property.nextRentDue = 0;
        property.tenant = address(0);
        property.invalid = true;
        emit ContractRefunded(_propertyId, property.tenant);
    }

    // 续租的功能函数
    function renewLease(uint256 _propertyId) public payable {
        RentalProperty storage property = properties[_propertyId];
        require(property.isRented, "Property is not rented");
        require(
            msg.sender == property.tenant,
            "Only tenant can renew the lease"
        );
        require(
            msg.value == property.rent,
            "your given value is not equal to the rent"
        );
        property.nextRentDue = property.nextRentDue + 30 days;
        property.landlord.transfer(msg.value);
        emit LeaseRenewed(
            _propertyId,
            msg.sender,
            msg.value,
            property.nextRentDue
        );
    }

    // 查询房源信息的功能函数
    function getProperty(
        uint256 _propertyId
    ) public view returns (RentalProperty memory) {
        return properties[_propertyId];
    }

    function getAllProperties() public view returns (RentalProperty[] memory) {
        RentalProperty[] memory allProperties = new RentalProperty[](
            propertyCount
        );
        for (uint256 i = 0; i < propertyCount; i++) {
            allProperties[i] = properties[i];
        }
        return allProperties;
    }

    // 租约到期，返还押金
    function returnDeposit(uint256 _propertyId) public {
        RentalProperty storage property = properties[_propertyId];
        require(property.isRented, "Property is not rented");
        require(
            msg.sender == property.tenant,
            "Only tenant can return deposit"
        );
        require(
            block.timestamp >= property.nextRentDue,
            "Lease period has not ended"
        );
        uint256 deposit = property.rent; 
        payable(property.tenant).transfer(deposit);
        emit DepositReturned(_propertyId, property.tenant, deposit);
        property.isRented = false;
        property.tenant = address(0); 
        property.hashLock = 0x0; 
        property.timeLock = 0; 
        property.nextRentDue = 0; 
    }
}
