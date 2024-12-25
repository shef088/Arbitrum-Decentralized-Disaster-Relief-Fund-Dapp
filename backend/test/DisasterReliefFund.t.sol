
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Test, console} from "forge-std/Test.sol";
import {DisasterReliefFund} from "../src/DisasterReliefFund.sol";

contract DisasterReliefFundTest is Test {
    DisasterReliefFund public fund;

    // Set up the contract
    function setUp() public {
        fund = new DisasterReliefFund();
    }

 
}