// SPDX-License-Identifier: Unicensed

pragma solidity ^0.8.0;

import "./ITRC20.sol";

contract InvestExTRC20 {
    address public owner;
    address public tokenAddress;
    uint256 public allDeposit;
    uint256 public allWithdraw;

    struct user {
        uint256 depositAmount;
        uint256 amountForWithdraw;
        uint256 withdrawed;
    }

    mapping(address => user) public Users;
    mapping(address => bool) public Admins;

    constructor(address _tokenAddress) {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
    }

    modifier onlyAdmin() {
        require(Admins[msg.sender] == true, "Only admin");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function setAdmin(address _address, bool _state) public onlyOwner {
        Admins[_address] = _state;
    }

    function setTokenAddress(address _address) public onlyOwner {
        tokenAddress = _address;
    }

    function depositTokens(uint256 _value, address _address) public {
        ITRC20(tokenAddress).transferFrom(msg.sender, address(this), _value);
        Users[_address].depositAmount += _value;
        allDeposit += _value;
    }

    function setUserWithdrawAmount(uint256 _value, address _address)
        public
        onlyAdmin
    {
        Users[_address].amountForWithdraw = _value;
    }

    function withdraw(uint256 _value, address _address) public {
        require(
            Users[msg.sender].amountForWithdraw >= _value,
            "insufficient funds, reduce the withdrawal amount"
        );
        ITRC20(tokenAddress).transfer(_address, _value);
        Users[msg.sender].withdrawed += _value;
        Users[msg.sender].amountForWithdraw -= _value;
        allWithdraw += _value;
    }
}
