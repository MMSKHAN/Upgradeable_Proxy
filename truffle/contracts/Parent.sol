// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
pragma experimental ABIEncoderV2;
contract Parent {
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
}