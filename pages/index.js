import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/Header"
import LotteryEntrance from '../components/LotteryEntrance'
import { useMoralis } from 'react-moralis'

export default function Home() {
  const { isWeb3Enabled } = useMoralis()
  return (
    <div className={styles.container}>
      <Header />
      {isWeb3Enabled ? (
        <>
          <LotteryEntrance />
        </>
      ) : (
        <div>No Metamask detected .....</div>
      )}
    </div>
  )
}


