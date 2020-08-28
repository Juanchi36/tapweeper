import React from 'react';
import winner from '../../assets/end.jpg';
import looser from '../../assets/broken.jpg';
import styles from './styles';

function Banner ({status}) {
  return(
    <div style={styles.content}>
      {status === 'winner' ? (
        <img src={winner} alt="roller coaster arrival" style={styles.img}/>
      ) : (
        <img src={looser} alt="broken roller coaster"style={styles.img}/>
      )}
    </div>
  );
};

export default Banner;