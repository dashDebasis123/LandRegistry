import { ConnectButton } from "web3uikit"
import Link from "next/link"
import Web3 from "web3"
import { useEffect, useState }  from "react"


export default function Header() {
    const [walletAddress, setWalletAddress] = useState("")
    // const [getChainId, setChainId] = useState("")

    let web3
    useEffect(() => {
        getCurrentWalletConnected()
        addWalletListener()
    })

    // useEffect(() => {
    //     // Function to fetch the chain ID
    //     const getChainId = async () => {
    //         if (web3) {
    //             try {
    //                 const id = await web3.eth.getChainId();
    //                 setChainId(id);
    //             } catch (error) {
    //                 console.error('Error fetching chain ID:', error);
    //             }
    //         }
    //     };

        
    //     if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    //         web3 = new Web3(window.ethereum);
    //         setWalletAddress(""); // Reset walletAddress state when component mounts

    //         // Request user permission to access their accounts
    //         window.ethereum.request({ method: "eth_requestAccounts" })
    //             .then(() => {
    //                 // Permission granted, set web3 instance and fetch chain ID
    //                 setWalletAddress(web3.currentProvider.selectedAddress);
    //                 getChainId();
    //             })
    //             .catch(error => {
    //                 console.error('Permission denied:', error);
    //             });
            
    //         // Listen for account changes
    //         window.ethereum.on("accountsChanged", (accounts) => {
    //             setWalletAddress(accounts[0]);
    //             getChainId();
    //         });
    //     }
    // }, []);

    const connectWallet = async() => {
        
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try {
                const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
                web3 = new Web3(window.ethereum)
                setWalletAddress(accounts[0])
                console.log(accounts[0])
            }catch(err){
                console.error(err.meassage)
            }
        }
        else{
            console.log("install metamask")
        }
    }

    const getCurrentWalletConnected = async() => {
        
        if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
            try {
                const accounts = await window.ethereum.request({method: "eth_accounts"})
                console.log(walletAddress.length)
                if(walletAddress.length > 0 ){
                    setWalletAddress(accounts[0])
                    console.log(accounts[0])
                    console.log(web3.eth.get_chainId)
                }else{
                    console.log("connect to metamask using connect button")
                }
                
            }catch(err){
                console.error(err.meassage)
            }
        }
        else{
            console.log("install metamask")
        }
    }


    const addWalletListener = async() => {
        
        if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
            window.ethereum.on("accountsChanged", (accounts) => {
                setWalletAddress(accounts[0])
                console.log(accounts[0])
            })
            
        }
        else{
            setWalletAddress("")
            console.log("please install metamask")
        }
    }


    return (
        
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6">Sell NFT</a>
                </Link>
                <button className="button is-white connect wallet" onClick={connectWallet}>
                    <span className="is-link has-text-weight-bold">
                        {walletAddress && walletAddress.length>0 ? `connected ${walletAddress.substring(0,6)}....${walletAddress.substring(38)}` : "Connect Wallet"}
                    </span>    
                </button>
                
            </div>
        </nav>
    )
}
