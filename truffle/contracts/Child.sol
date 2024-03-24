// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "./Parent.sol";
contract Child{
      struct Farmer {
        string name;
        address add;
        string variety;
        uint quantity;
        string dateofharvest;
    }
    
    Farmer[] public Kisan;

    function setKisan(string memory _name, address _add, string memory _variety, uint _quantity, string memory _dateofharvest) public {
        Farmer memory newdetail = Farmer(_name, _add, _variety, _quantity, _dateofharvest);
        Kisan.push(newdetail);
    }

    function getKisan() public view returns (Farmer[] memory) {
        return Kisan;
    }

    struct Warehouse {
        string add;
        string packingdate;
        string rtedate;
        string contact;
    }
    
    Warehouse[] public warhouse;

    function setWare(string memory _add, string memory _packingdate, string memory _rtedate, string memory _contact) public {
        Warehouse memory newdetail = Warehouse(_add, _packingdate, _rtedate, _contact);
        warhouse.push(newdetail);   
    }

    function getWare() public view returns (Warehouse[] memory) {
        return warhouse;
    }
struct Logistics {
        address id;
        string name;
        uint256 vehumber;
        uint256 drinumber;
        string drivename;
    }
    
    Logistics[] public log;

    function setLog(address _id, string memory _name, uint256 _vehiclenumber, uint256 _drivernumber, string memory _drivername) public {
        Logistics memory newdetail = Logistics(_id, _name, _vehiclenumber, _drivernumber, _drivername);
        log.push(newdetail);
    }

    function getLog() public view returns (Logistics[] memory) {
        return log;
    }

    struct Wholesaler {
        uint256 retailerID;
        uint256 productID;
        uint256 salesID;
        address add;
        string email;
    }
    
    Wholesaler[] public wholesaler;

    function setWholesaler(uint256 _retailerID, uint256 _productID, uint256 _salesID, address _add, string memory _email) public {
        Wholesaler memory newdetail = Wholesaler(_retailerID, _productID, _salesID, _add, _email);
        wholesaler.push(newdetail);
    }

    function getWholesaler() public view returns (Wholesaler[] memory) {
        return wholesaler;
    }
function dataMigration(address parentAddress) public {
    Parent parentContract = Parent(parentAddress);
    Parent.Farmer[] memory kisanData = parentContract.getKisan();
    for (uint i = 0; i < kisanData.length; i++) {
        setKisan(kisanData[i].name, kisanData[i].add, kisanData[i].variety, kisanData[i].quantity, kisanData[i].dateofharvest);
    }
    Parent.Warehouse[] memory warehouseData = parentContract.getWare();
    for (uint i = 0; i < warehouseData.length; i++) {
        setWare(warehouseData[i].add, warehouseData[i].packingdate, warehouseData[i].rtedate, warehouseData[i].contact);
    }
}



}