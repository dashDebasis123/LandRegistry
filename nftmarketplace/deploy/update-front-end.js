const {
    frontEndContractsFile2,
    frontEndAbiLocation2,
} = require("../helper-hardhat-config")


require("dotenv").config()
const fs = require("fs")
const { ethers, network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        // await updateAbi()
        console.log("Front end written!")
    }
}

// async function updateAbi() {
//     const nftMarketplace = await ethers.getContract("NftMarketplace")
    
//     fs.writeFileSync(
//         `${frontEndAbiLocation2}NftMarketplace.json`,
//         nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
//     )

//     const basicNft = await ethers.getContract("BasicNftTwo")
    
//     fs.writeFileSync(
//         `${frontEndAbiLocation2}BasicNft.json`,
//         basicNft.interface.format(ethers.utils.FormatTypes.json)
//     )
// }

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    console.log(nftMarketplace.target)
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile2, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.target)) {
            contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.target)
        }
    } else {
        contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.target] }
    }
    // fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]