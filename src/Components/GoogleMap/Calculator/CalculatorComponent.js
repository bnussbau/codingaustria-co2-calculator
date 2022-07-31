import React, { useEffect, useState } from "react";
import styles from "./CalculatorComponent.module.scss";
import Map from "../Map";
import tree from "../../../ecosystem.png";
import Confetti from "./Confetti";
import classNames from "classnames";
const cars = [
  {
    car: "Fiat 500",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27FIAT%27%20and%20Cn%3D%27500%27%20and%20year%3D%272018%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
  {
    car: "Skoda Octavia",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27Skoda%27%20and%20Cn%3D%27Octavia%27%20and%20year%3D%272020%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
  {
    car: "VW Golf",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27VOLKSWAGEN%27%20and%20Cn%3D%27Golf%27%20and%20year%3D%272020%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
  {
    car: "VW T-Roc",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27VOLKSWAGEN%27%20and%20Cn%3D%27T-Roc%27%20and%20year%3D%272020%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
  {
    car: "Skoda Fabia",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27Skoda%27%20and%20Cn%3D%27Fabia%27%20and%20year%3D%272020%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
  {
    car: "VW Polo",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27VOLKSWAGEN%27%20and%20Cn%3D%27Polo%27%20and%20year%3D%272020%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
  {
    car: "Seat Ibiza",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27Seat%27%20and%20Cn%3D%27Ibiza%27%20and%20year%3D%272020%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
  {
    car: "Dacia Sandero",
    value:
      "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27Dacia%27%20and%20Cn%3D%27Sandero%27%20and%20year%3D%272020%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null",
  },
];
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

const Co2Display = ({ value, duration = 5, isWalking, isPickUp }) => {
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
      <p>{isWalking ? 0 : isPickUp ? value : count}g</p>
    </div>
  );
};

const treeImage = (count) => {
  var arr = [...Array(count).keys()];
  return arr.fill(<img src={tree} className={styles.tree} alt="Ecosystem" />);
};

const CalculatorComponent = () => {
  const [start, setStart] = useState(false);
  const [carQuery, setCarQuery] = useState(
    "https://discodata.eea.europa.eu/sql?query=SELECT%20TOP%201%20%22Enedc%20(g%2Fkm)%22%20FROM%20%5BCO2Emission%5D.%5Blatest%5D.%5Bco2cars%5D%20WHERE%20Mk%3D%27FIAT%27%20and%20Cn%3D%27500%27%20and%20year%3D%272018%27%20order%20by%20%22Enedc%20(g%2Fkm)%22%20desc&p=1&nrOfHits=100&mail=null&schema=null"
  );
  const [co2Value, setCo2Value] = useState(161);
  const handleConfetti = () => {
    setStart(!start);
    setInterval(() => {
      setStart(false);
    }, 3000);
  };

  /***** PARAMS *****/
  const url = document.location.href;
  const urlParams = new URL(url);
  const deliveryType = urlParams.searchParams.get("deliverytype");
  const pickup = urlParams.searchParams.get("pickwalk");
  const carPickup = urlParams.searchParams.get("car_pickup");
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

  /***** API CALLS for emission *****/
  const getApiData = async (carQuery) => {
    const { results } = await fetch(carQuery).then((response) =>
      response.json()
    );
    if (results.length > 0) {
      setCo2Value(results[0]["Enedc (g/km)"]);
    }
  };

  const handleCarQuery = (e) => {
    setCarQuery(e.target.value);
  };

  useEffect(() => {
    getApiData(carQuery);
  }, [carQuery]);

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.displayWrapper}>
          <p className={styles.title}>Do you have a car? Select!</p>
          <select className={styles.select} onChange={handleCarQuery}>
            {cars.map(({ car, value }) => (
              <option className={styles.options} value={value}>
                {car}
              </option>
            ))}
          </select>
        </div>

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
            The amount of CO&#178; you spend by picking up with your car.
          </p>
          <div className={styles.treeWrapper}>
            <Co2Display
              isPickUp
              value={Math.round(carPickup / 123) * co2Value}
              duration={5}
            />
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
