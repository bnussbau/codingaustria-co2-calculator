import React, { useEffect, useState } from "react";
import styles from "./CalculatorComponent.module.scss";

const ProgressBar = ({ value, duration = 20 }) => {
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
    <div
      style={{
        backgroundImage: `linear-gradient(to right, blue
      ${count}%, white ${count}% 100%)`,
      }}
      className={styles.progressBar}
    >
      <p class="" size="lg" noSpacing>
        {count}
      </p>
    </div>
  );
};

const CalculatorComponent = () => {
  const fetchData = async () => {
    const response = await fetch("https://api.github.com/users/octocat");
    const data = await response.json();
    console.log(data);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex" }}>
        <ProgressBar value={50} />
        <ProgressBar value={50} />
      </div>
    </div>
  );
};

export default CalculatorComponent;
