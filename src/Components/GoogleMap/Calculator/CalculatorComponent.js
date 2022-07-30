import React, { useEffect, useState } from 'react';
import styles from './CalculatorComponent.module.scss';
import Map from '../Map';
import tree from '../../../ecosystem.png';
import Confetti from './Confetti';
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

const cords = [
  { lat: 48.215739883024661, lng: 16.370281800013927 },
  /*  { lat: 48.23254325432884, lng: 16.347499612663768 },
  { lat: 48.255521473262206, lng: 16.34578299896641 },
  { lat: 48.15298340794733, lng: 16.36167830749079 },
  { lat: 48.240235287643756, lng: 16.485153472778876 }, */
  { lat: 48.20628991639443, lng: 16.34524805104454 },
];

const Co2Display = ({ value, duration = 10 }) => {
  const test = new URL(document.location.href).searchParams.get('test');
  console.log(`buddies ~ Co2Display ~ test`, test);

  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < value) {
        setCount(prev => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [count, duration, value]);
  return (
    <div className={styles.Co2Display}>
      <p>{count}kg</p>
    </div>
  );
};

const treeImage = count => {
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
          <div className={styles.treeWrapper}>
            <Co2Display value={customer?.co2SavedKg} duration={120} />
            {treeImage(1)}
          </div>
        </div>
        <div className={styles.displayWrapper}>
          <p className={styles.title}>
            The amount of CO&#178; the shop saved the last month.
          </p>
          <div className={styles.treeWrapper}>
            <Co2Display value={merchant?.co2SavedKg} duration={5} />
            {treeImage(3)}
          </div>
        </div>
        <div className={styles.displayWrapper}>
          <p className={styles.title}>
            The amount of CO&#178; the shop saved the last month.
          </p>
          <div className={styles.treeWrapper}>
            <Co2Display value={merchant?.co2SavedKg} duration={5} />
            {treeImage(6)}
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
