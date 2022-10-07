import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import "./Portfolio.css";

const Portfolio = ({
  crypto: { quote, cost, date },
  index,
  deleteCryptoName,
}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [invalidSymbolModal, setInvalidSymbolModal] = useState(true);
  const [missingData, setMissingData] = useState(false);

  const rateReturn = ((cryptoData - cost) / cost) * 100;
  const roundedRateReturn = rateReturn.toFixed();

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const toggleInvalidSymbolModal = () =>
    setInvalidSymbolModal(!invalidSymbolModal);

  let oldDate = date.split("-");
  let formattedOldDate = new Date(oldDate[0], oldDate[1] - 1, oldDate[2]);
  let today = new Date();
  let diff = new Date(today.getTime() - formattedOldDate.getTime());
  let holdingPeriod = Math.floor(diff / (1000 * 3600 * 24));
  let HoldingPeriodYear = Math.round(holdingPeriod / 365);
  let HoldingPeriodDay = holdingPeriod % 365;

  const holdingPeriodChecker = () => {
    if (!date) {
      return <li> N/A </li>;
    }
    if (HoldingPeriodYear > 1) {
      return (
        <li>
          {" "}
          {HoldingPeriodYear} years {HoldingPeriodDay} days{" "}
        </li>
      );
    } else if (HoldingPeriodYear === 1) {
      return (
        <li>
          {" "}
          {HoldingPeriodYear} year {HoldingPeriodDay} days{" "}
        </li>
      );
    } else {
      return <li> {HoldingPeriodDay} days </li>;
    }
  };

  const rateReturnChecker = () => {
    if (roundedRateReturn > 0) {
      return (
        <li className="returnPositive">
          <a>{roundedRateReturn}%</a>
        </li>
      );
    } else {
      return (
        <li className="returnNegative">
          <a>{roundedRateReturn}%</a>
        </li>
      );
    }
  };

  useEffect(() => {
    (async () => {
      setMissingData(false);
      try {
        const data = await axios(`https://api.coincap.io/v2/assets/${quote}`);
        const rawCryptoPrice = data.data.data.priceUsd;
        const roundCryptoPrice = (
          Math.round(rawCryptoPrice * 100) / 100
        ).toFixed(2);
        let isMyObjectEmpty = !Object.keys(roundCryptoPrice).length;
        if (isMyObjectEmpty) {
          setMissingData(true);
        }
        setCryptoData(roundCryptoPrice);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [quote]);

  return (
    <div className="table-wrapper">
      {missingData ? (
        <Modal isOpen={invalidSymbolModal} toggle={toggleInvalidSymbolModal}>
          <ModalHeader
            style={{ color: "red" }}
            toggle={() => {
              deleteCryptoName(index);
              toggleInvalidSymbolModal();
            }}
          ></ModalHeader>
        </Modal>
      ) : (
        <div>
          <ul className="sub-table-headings">
            <li style={{ width: "2rem" }}>{index + 1}</li>
            <li>{quote}</li>
            <li>${cryptoData}</li>
            <li>${cost}</li>
            {holdingPeriodChecker()}
            {rateReturnChecker()}
            <li style={{ borderStyle: "none" }}>
              <span className="deleteCrypto" onClick={toggleDeleteModal}>
                <i class="fas fa-trash fa-2x"></i>
              </span>
            </li>{" "}
          </ul>

          <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
            <ModalHeader toggle={toggleDeleteModal}>
              Delete Confirmation
            </ModalHeader>
            <ModalBody>Are you sure you want to delete {quote}?</ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  deleteCryptoName(index);
                  toggleDeleteModal();
                }}
              >
                Delete
              </Button>{" "}
              <Button color="secondary" onClick={toggleDeleteModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
