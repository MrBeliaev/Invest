// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TRC20.sol";

contract TestToken is TRC20 {
    constructor() TRC20("TestToken", "NTRX") {
        _mint(msg.sender, 1000000 * 10**6);
    }
}
