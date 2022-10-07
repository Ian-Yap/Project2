import React, { useEffect, useState } from "react";
import "./TopSixChart.css";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import axios from "axios";

const TopSixChart = () => {
  const [data, setData] = useState(null);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!data) return null;

  return (
    <div className="chart">
      {/* <div className="title">
        Top Six Cryptocurrencies Traded (Volume in 24 hours)
      </div> */}
      <div className="card">
        <div className="pic">
          <img src={data[0].image} alt="" />
        </div>
        <h5>{data[0].name}</h5>
        <p>${data[0].current_price.toLocaleString()}</p>
        {data[0].price_change_percentage_24h < 0 ? (
          <span className="red">
            <FiArrowDown className="arrow" />
            {data[0].price_change_percentage_24h.toFixed(2)}%
          </span>
        ) : (
          <span className="green">
            <FiArrowUpRight className="arrow" />
            {data[0].price_change_percentage_24h.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="card">
        <div className="pic">
          <img src={data[1].image} alt="" />
        </div>
        <h5>{data[1].name}</h5>
        <p>${data[1].current_price.toLocaleString()}</p>
        {data[1].price_change_percentage_24h < 0 ? (
          <span className="red">
            <FiArrowDown className="arrow" />
            {data[1].price_change_percentage_24h.toFixed(2)}%
          </span>
        ) : (
          <span className="green">
            <FiArrowUpRight className="arrow" />
            {data[1].price_change_percentage_24h.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="card">
        <div className="pic">
          <img src={data[2].image} alt="" />
        </div>
        <h5>{data[2].name}</h5>
        <p>${data[2].current_price.toLocaleString()}</p>
        {data[2].price_change_percentage_24h < 0 ? (
          <span className="red">
            <FiArrowDown className="arrow" />
            {data[2].price_change_percentage_24h.toFixed(2)}%
          </span>
        ) : (
          <span className="green">
            <FiArrowUpRight className="arrow" />
            {data[2].price_change_percentage_24h.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="card">
        <div className="pic">
          <img src={data[3].image} alt="" />
        </div>
        <h5>{data[3].name}</h5>
        <p>${data[3].current_price.toLocaleString()}</p>
        {data[3].price_change_percentage_24h < 0 ? (
          <span className="red">
            <FiArrowDown className="arrow" />
            {data[3].price_change_percentage_24h.toFixed(2)}%
          </span>
        ) : (
          <span className="green">
            <FiArrowUpRight className="arrow" />
            {data[3].price_change_percentage_24h.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="card">
        <div className="pic">
          <img src={data[4].image} alt="" />
        </div>
        <h5>{data[4].name}</h5>
        <p>${data[4].current_price.toLocaleString()}</p>
        {data[4].price_change_percentage_24h < 0 ? (
          <span className="red">
            <FiArrowDown className="arrow" />
            {data[4].price_change_percentage_24h.toFixed(2)}%
          </span>
        ) : (
          <span className="green">
            <FiArrowUpRight className="arrow" />
            {data[4].price_change_percentage_24h.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="card">
        <div className="pic">
          <img src={data[5].image} alt="" />
        </div>
        <h5>{data[5].name}</h5>
        <p>${data[5].current_price.toLocaleString()}</p>
        {data[5].price_change_percentage_24h < 0 ? (
          <span className="red">
            <FiArrowDown className="arrow" />
            {data[5].price_change_percentage_24h.toFixed(2)}%
          </span>
        ) : (
          <span className="green">
            <FiArrowUpRight className="arrow" />
            {data[5].price_change_percentage_24h.toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default TopSixChart;
