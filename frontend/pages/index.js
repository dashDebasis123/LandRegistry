import styles from "../styles/Home.module.css"
import { useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "./networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
<<<<<<< HEAD
import { useQuery } from "@apollo/client"
import Web3 from "web3"
import { useEffect, useState }  from "react"
import Header from "../components/Header"
import {getChainId} from "../components/Header"

=======
 import { useQuery } from "@apollo/client"
>>>>>>> 84abfcecdf45833759df35891308a338e29375d9

export default function Home() {
    // const providerUrl =  "https://sepolia.infura.io/v3/10bcae15a08642598e211b222cfbe719"
    // const web3 = new Web3(providerUrl);
    
    const [chainId, setChainId] = useState("")
    const getChainId = async () => {
        const web3 = new Web3(window.ethereum);
        const id = await web3.eth.getChainId();
        setChainId(id);
    };

    getChainId();
    console.log("chain ID: " + chainId)
    
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);
    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {chainId ? (
                    loading || !listedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.activeItems.map((nft) => {
                            const { price, nftAddress, tokenId, seller } = nft
                            return marketplaceAddress ? (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            ) : (
                                <div>Network error, please switch to a supported network. </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
