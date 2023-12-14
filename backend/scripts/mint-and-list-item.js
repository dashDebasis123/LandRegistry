const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const PRICE = ethers.parseEther("0.1")

async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    // console.log(nftMarketplace)
    const basicNft= await ethers.getContract("BasicNftTwo")
    // const nftMarketplaceDeployment = await deployments.get("NftMarketplace");
    // const basicNftDeployment = await deployments.get("BasicNftTwo");

    // if (!nftMarketplaceDeployment || !basicNftDeployment) {
    // throw new Error("Contract deployments not found");
    // }
    // else{console.log("good")}
    console.log("Minting NFT...")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.logs[0].args.tokenId
    console.log(tokenId)
    console.log(nftMarketplace.target)
    console.log("Approving NFT...")
    
    const approvalTx = await basicNft.approve(nftMarketplace.target, tokenId)
    // console.log(approvalTx)
    await approvalTx.wait(1)
    console.log("Listing NFT...")
    const tx = await nftMarketplace.listItem(basicNft.target, tokenId, PRICE)
    console.log(basicNft.target, tokenId, PRICE)
    await tx.wait(1)
    console.log("NFT Listed!")
    console.log(nftMarketplace.target,tokenId)
    if (network.config.chainId == 31337) {
        // Moralis has a hard time if you move more than 1 at once!
        await moveBlocks(1, (sleepAmount = 1000))
    }
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })