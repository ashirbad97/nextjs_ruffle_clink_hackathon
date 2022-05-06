import { useWeb3Contract, useMoralis } from "react-moralis";
import abi from "../constants/abi.json"
import { useState, useEffect } from "react"

export default function LotteryEntrance() {
    const { isWeb3Enabled } = useMoralis()
    const [recentWinner, setRecentWinner] = useState("0")
    const [numPlayer, setNumPlayers] = useState("0")
    const CONTRACT_ADDRESS = "0x9F1A756a3B459285a631e638236ba11652B97907"
    // Enter Lottery Button
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "enterRaffle",
        msgValue: "100000000000000000", //0.1 ETH
        params: {},
    })
    // View Functions
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "s_recentWinner",
        params: {},
    })

    useEffect(() => {
        async function updateUi() {
            const recentWinnerFromCall = await getRecentWinner()
            setRecentWinner(recentWinnerFromCall)
        }
        if (isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            <button onClick={async () => {
                await enterRaffle()
            }}>Enter Lottery</button>
            <div>The Recent Winner was : {recentWinner}</div>
        </div>
    )
}