require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const SEPOLIA_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/rhFU6gtSqgHTwV2ImBhPCREANGrsZmma"
const PRIVATE_KEY = "0x63c1bde234ec7eea0d23064a18e4003ce9dfec4a742cbd1b8e3b58ac33969ab0"
const ETHERSCAN_API_KEY = "GJ4JZ2CA667A5216P7E35MH7TDFQCCM6IF"
const REPORT_GAS = true


module.exports = {
    solidity: "0.8.7",
    paths: {
        artifacts: "../frontend/constants/"
    },

    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            chainId: 11155111,
        },

    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    contractSizer: {
        runOnCompile: false,
        only: ["NftMarketplace"],
    },
    mocha: {
        timeout: 200000,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    contractSizer: {
        runOnCompile: false,
        only: ["NftMarketplace"],
    }
}
