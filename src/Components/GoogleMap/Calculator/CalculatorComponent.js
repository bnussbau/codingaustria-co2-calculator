import React, { useEffect, useState } from "react";
import styles from "./CalculatorComponent.module.scss";
import Map from "../Map";
import Confetti from "./Confetti";
const mockData = {
  route: [
    {
      lat: 48.215739883024661,
      lng: 16.370281800013927,
    },
    {
      lat: 48.215739883024661,
      lng: 17.370281800013927,
    },
  ],
  merchant: {
    co2SavedKg: 200.8,
  },
  customer: {
    co2SavedKg: 1.28,
  },
};

const Co2Display = ({ value, duration = 10 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < value) {
        setCount((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [count]);
  return (
    <div className={styles.Co2Display}>
      <p>{count}</p>
    </div>
  );
};

const CalculatorComponent = () => {
  const [start, setStart] = useState(false);
  const { route, merchant, customer } = mockData;
  const handleConfetti = () => {
    setStart(!start);
    setInterval(() => {
      setStart(false);
    }, 3000);
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.displayWrapper}>
          <p className={styles.title}>
            The amount of CO&#178; you would spent if you drive to the shop.
          </p>
          <Co2Display value={customer?.co2SavedKg} duration={120} />
        </div>
        <div className={styles.displayWrapper}>
          <p className={styles.title}>
            The amount of CO&#178; you saved with this purchase.
          </p>
          <Co2Display value={customer?.co2SavedKg} duration={120} />
        </div>
        <div className={styles.displayWrapper}>
          <p className={styles.title}>
            The amount of CO&#178; the shop saved the last month.
          </p>
          <Co2Display value={merchant?.co2SavedKg} duration={5} />
        </div>
      </div>
      <div className={styles.mapWrapper} onClick={handleConfetti}>
        <Map route={route} />
      </div>
      {start && <Confetti start={start} />}
    </div>
  );
};

export default CalculatorComponent;
