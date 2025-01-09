// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IUniswapV3Factory.sol";
import "./interfaces/INonfungiblePositionManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PiperXswapV3PoolManager {
    address public immutable positionManager;
    address public immutable v3Factory;

    constructor(address _positionManager, address _v3Factory) {
        positionManager = _positionManager;
        v3Factory = _v3Factory;
    }

    function createPoolAndAddLiquidity(
        address tokenA,
        address tokenB,
        uint24 fee,
        uint160 sqrtPriceX96,
        int24 tickLower,
        int24 tickUpper,
        uint amount0Desired,
        uint amount1Desired,
        uint amount0Min,
        uint amount1Min,
        address recipient,
        uint deadline
    ) external returns (
        address pool,
        uint tokenId,
        uint128 liquidity,
        uint amount0,
        uint amount1
    ) {
        require(tokenA != tokenB, "IDENTICAL_ADDRESSES");

        // Sort tokens
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        
        // Create and initialize pool if necessary
        pool = INonfungiblePositionManager(positionManager).createAndInitializePoolIfNecessary(
            token0,
            token1,
            fee,
            sqrtPriceX96
        );

        // Approve tokens for position manager
        IERC20(token0).approve(positionManager, amount0Desired);
        IERC20(token1).approve(positionManager, amount1Desired);

        // Add liquidity and mint NFT position
        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
            token0: token0,
            token1: token1,
            fee: fee,
            tickLower: tickLower,
            tickUpper: tickUpper,
            amount0Desired: amount0Desired,
            amount1Desired: amount1Desired,
            amount0Min: amount0Min,
            amount1Min: amount1Min,
            recipient: recipient,
            deadline: deadline
        });

        (tokenId, liquidity, amount0, amount1) = INonfungiblePositionManager(positionManager).mint(params);
    }
} 