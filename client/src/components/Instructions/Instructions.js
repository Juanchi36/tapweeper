import React from 'react';

import styles from './styles';

function Instructions ({status}) {
  return(
    <div style={styles.content}>
      <h2>Instructions</h2>
      <p style={styles.text}>The objective of the game is to clear a the board containing hidden "mines" or bombs without detonating any of them. Use left click to uncover the spaces or right click to mark them. Good luck!</p>
    </div>
  );
};

export default Instructions;