import Cryptocard from "./components/Cryptocard"
import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [coins, setCoins] = useState([])
  const [filteredCoins, setFilteredCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true)
      setErrors("")

      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
        setCoins(response.data)
        setFilteredCoins(response.data)
      } catch (error) {
        setErrors("Error 404!")
      } finally {
        setLoading(false)
      }
    }
    fetchCryptoData()
  }, [])

  //search term done by AI
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCoins(coins)
    } else {
      const filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCoins(filtered)
    }
  }, [searchTerm, coins])

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="app">
      <p className="footer-text">Made with ❤️ by Shibaditya Deb</p>
      <h1>Crypto Price Tracker</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search cryptocurrency..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading && <p className="loading">Loading...</p>}
      {errors && <p className="error">{errors}</p>}

      <div className="crypto-container">
        {filteredCoins.length > 0
          ? filteredCoins.map((coin) => <Cryptocard key={coin.id} coin={coin} />)
          : !loading && <p className="no-results">No cryptocurrencies found matching your search.</p>}
      </div>
    </div>
  )
}

export default App
