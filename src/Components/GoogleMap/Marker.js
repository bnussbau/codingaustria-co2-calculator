import React from 'react';
import houseImg from '../../house.png';
import shopImg from '../../shop.png';

import styles from './Marker.module.scss';

const Marker = ({ text, firstElement, lastElement, ...props }) => (
  <div {...props}>
    {firstElement && (
      <img src={houseImg} className={styles.tree} alt="Ecosystem" />
    )}
    {lastElement && (
      <img src={shopImg} className={styles.tree} alt="Ecosystem" />
    )}
  </div>
);

export default Marker;
