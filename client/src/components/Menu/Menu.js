import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import styles from './styles';

function Menu({ handleStart }) {
  const [size, setSize] = React.useState('10');
  const [level, setLevel] = React.useState('1');

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  return (
    <div style={styles.content}>
      <h3 style={styles.text}>Roller Coster Minesweeper</h3>
      <FormControl component="size">
        <FormLabel component="legend" style={styles.form}>Size</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={size} onChange={handleChangeSize}>
          <div style={styles.radio}>
            <FormControlLabel value="5" control={<Radio />} label="Small" />
            <FormControlLabel value="10" control={<Radio />} label="Medium" />
            <FormControlLabel value="15" control={<Radio />} label="Large" />
          </div>
        </RadioGroup>
      </FormControl>
      <FormControl component="large">
        <FormLabel component="legend" style={styles.form}>Level</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={level} onChange={handleChangeLevel}>
          <div style={styles.radio}>
            <FormControlLabel value="1" control={<Radio />} label="Easy" />
            <FormControlLabel value="2" control={<Radio />} label="Advanced" />
            <FormControlLabel value="3" control={<Radio />} label="God" />
          </div>
        </RadioGroup>
      </FormControl>
      <Button
        variant="outlined"
        color="secondary"
        style={styles.button}
        onClick={() => handleStart(size, level)}
      >LET'S RIDE!</Button>
    </div>
  );
};

export default Menu;

