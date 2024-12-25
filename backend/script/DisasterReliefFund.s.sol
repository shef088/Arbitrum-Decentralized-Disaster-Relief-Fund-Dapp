// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Script, console} from "forge-std/Script.sol";
import {DisasterReliefFund} from "../src/DisasterReliefFund.sol";

contract DisasterReliefFundScript is Script {
    DisasterReliefFund public fund;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        fund = new DisasterReliefFund();

        vm.stopBroadcast();
    }
}
