// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TRC20.sol";

contract NewToken is TRC20 {
    constructor() TRC20("NewToken", "NEW") {
        _mint(msg.sender, 1000000 * 10**6);
    }
}
