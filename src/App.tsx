import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './App.module.css'

function App() {
  const [holdings, setHoldings] = useState<any>([])

  const fetchData = async () => {
    const data = await axios.get('https://api.inspireinsight.com/api/tickers/1784/constituents?size=100')
    setHoldings(data.data.holdings)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (holdings.length === 0) {
    return (
      <>
        <div className={styles['lds-hourglass']}></div>
      </>
    )
  }

  return (
    <div className={styles.holdings}>
      {holdings.map((holding: any) => (
        <div className={styles.holding} key={holding.financialInstrumentId}>
        <ul>
          <li>Name: {holding.name}</li>
          <li>Ticker: {holding.ticker}</li>
          <li>Score: {holding.score}</li>
          <li>Holding Percentage: {holding.holdingPercentage}</li>
        </ul>
        </div>
      ))}
    </div>
  )
}

export default App
