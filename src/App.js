import React, { useState, useEffect } from "react";
import Portfolio from "./components/Portfolio";
import PortfolioForm from "./components/PortfolioForm";
import TopSixChart from "./components/TopSixChart";
import "./App.css";

function App() {
  const allCryptoData = localStorage.getItem("cryptoData")
    ? JSON.parse(localStorage.getItem("cryptoData"))
    : [];

  const [cryptoData, setCryptoData] = useState(allCryptoData);

  const addCryptoName = (quote, cost, date) => {
    const newCryptoData = [
      ...cryptoData,
      { quote: quote, cost: Number(cost), date: date, currentHolding: true },
    ];
    setCryptoData(newCryptoData);
  };

  const deleteCryptoName = (index) => {
    const newCryptoData = [...cryptoData];
    newCryptoData.splice(index, 1);
    setCryptoData(newCryptoData);
  };

  useEffect(() => {
    window.localStorage.setItem("cryptoData", JSON.stringify(cryptoData));
  }, [cryptoData]);

  return (
    <div>
      <PortfolioForm addCryptoName={addCryptoName} />
      {cryptoData.map((crypto, index) => (
        <div>
          <Portfolio
            key={crypto.id}
            index={index}
            crypto={crypto}
            deleteCryptoName={deleteCryptoName}
          />
        </div>
      ))}
      <TopSixChart />
    </div>
  );
}

export default App;
