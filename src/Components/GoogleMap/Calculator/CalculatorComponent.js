import React, { useEffect, useState } from "react";
import styles from "./CalculatorComponent.module.scss";
import Map from "../Map";
import tree from "../../../ecosystem.png";
import Confetti from "./Confetti";
import classNames from "classnames";

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

const Co2Display = ({ value, duration = 5, isWalking }) => {
  const [count, setCount] = useState(value ? 0 : "- ");
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < value) {
        setCount((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [count, duration, value]);
  return (
    <div className={styles.Co2Display}>
      <p>{isWalking ? 0 : count}g</p>
    </div>
  );
};

const treeImage = (count) => {
  var arr = [...Array(count).keys()];
  return arr.fill(<img src={tree} className={styles.tree} alt="Ecosystem" />);
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
  const url = document.location.href;
  const urlParams = new URL(url);

  const deliveryType = urlParams.searchParams.get("deliverytype");
  const pickup = urlParams.searchParams.get("pickwalk");
  const delivery = urlParams.searchParams.get("delivery");
  const [day, bundle] = urlParams.searchParams.get("bundle")?.split(";") || [];
  const total = urlParams.searchParams.get("total");
  const lat_shop = urlParams.searchParams.get("lat_shop");
  const lng_shop = urlParams.searchParams.get("lng_shop");
  const lat_home = urlParams.searchParams.get("lat_home");
  const lng_home = urlParams.searchParams.get("lng_home");
  const cords = [
    { lat: Number(lat_shop), lng: Number(lng_shop) },
    { lat: Number(lat_home), lng: Number(lng_home) },
  ];
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        {/* walking option */}
        {!!+pickup && (
          <div className={styles.pickupWrapper}>
            <p className={styles.title}>
              Congrats!! The store is less than 10 minutes walkaway from you .
            </p>
            <div className={styles.treeWrapper}>
              <Co2Display isWalking value={0} duration={5} />
              {treeImage(6)}
            </div>
          </div>
        )}
        {/* delivery option */}
        <div
          className={classNames(styles.displayWrapper, {
            [styles.active]: deliveryType === "1",
          })}
        >
          <p className={styles.title}>
            The amount of CO&#178; you saved with this purchase.
          </p>
          <div className={styles.treeWrapper}>
            <Co2Display value={delivery} duration={5} />
            {treeImage(1)}
          </div>
        </div>
        {/* bundle option */}
        <div
          className={classNames(styles.displayWrapper, {
            [styles.active]: deliveryType === "2",
          })}
        >
          <p className={styles.title}>
            By choosing the delivery to arrive in {day || "-"} days, this amount
            of CO&#178; will be saved.
          </p>
          <div className={styles.treeWrapper}>
            <Co2Display value={bundle} duration={10} />
            {treeImage(3)}
          </div>
        </div>
        <div
          className={classNames(styles.displayWrapper, {
            [styles.active]: deliveryType === "3",
          })}
        >
          <p className={styles.title}>
            The amount of CO&#178; the store saved the last month.
          </p>
          <div className={styles.treeWrapper}>
            <Co2Display value={total} duration={1} />
            {treeImage(5)}
          </div>
        </div>
      </div>
      <div className={styles.mapWrapper} onClick={handleConfetti}>
        <Map cords={cords} />
      </div>
      {start && <Confetti start={start} />}
    </div>
  );
};

export default CalculatorComponent;
