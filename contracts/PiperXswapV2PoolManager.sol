// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PiperXSwapV2PoolManager {
    address public immutable v2Router;

    constructor(address _v2Router) {
        v2Router = _v2Router;
    }

    function createPoolAndAddLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (address pair, uint amountA, uint amountB, uint liquidity) {
        require(tokenA != tokenB, "IDENTICAL_ADDRESSES");
       
        // Approve tokens for router
        IERC20(tokenA).approve(v2Router, amountADesired);
        IERC20(tokenB).approve(v2Router, amountBDesired);

        // Add liquidity
        (amountA, amountB, liquidity) = IUniswapV2Router02(v2Router).addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
    }
} 