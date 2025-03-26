const Cryptocard = ({ coin }) => {
    return (
      <>
        <div>
          <div className="crypto-card">
            <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="crypto-image" />
            <h2>{coin.name}</h2>
            <p className="crypto-symbol">{coin.symbol.toUpperCase()}</p>
            <p className="crypto-price">${coin.current_price.toFixed(2)}</p>
          </div>
        </div>
      </>
    )
  }
  
  export default Cryptocard
  
  