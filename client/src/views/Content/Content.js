import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Board from '../../components/Board/Board';
import Menu from '../../components/Menu/Menu';
import Banner from '../../components/Banner/Banner';
import Instructions from '../../components/Instructions/Instructions';
import axios from 'axios';
import styles from './styles';
import classes from './BackgroundVideo.module.css';
import GameContext from '../../contexts/GameContext';
import InstructionsContext from '../../contexts/InstructionsContext';
import DataContext from '../../contexts/DataContext';
import FlagContext from '../../contexts/FlagContext';

function Content() {
  const { data, setData } = useContext(DataContext);
  const { flags, setFlags } = useContext(FlagContext);
  const { gameOn, setGameOn } = useContext(GameContext);
  const { instructionsOn } = useContext(InstructionsContext);
  const [status, setStatus] = useState('');

  // Reset status game, create board & save marks in local storage
  const handleStart = async (size, level) => {
    setStatus();
    const url = `https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/newBoard?size=${size}&difficulty=${level}`;
    await axios.get(url).then(res => { setData(res.data) });
    localStorage.removeItem('flags');
    setFlags(JSON.parse(localStorage.getItem('flags')));
    setGameOn(true);
  };

  // Take the click and play or mark the square
  const handleClick = async (e, position) => {
    e.preventDefault();
    if (e.type === 'contextmenu') {
      let remove = false;
      let flagsTemp = JSON.parse(localStorage.getItem('flags'));
      flagsTemp && flagsTemp[0] && flagsTemp.map((flag, index) => {
        if (JSON.stringify(flag) === JSON.stringify(position)) {
          flagsTemp.splice(index, 1);
          localStorage.setItem("flags", JSON.stringify(flagsTemp));
          remove = true;
        }
        return true;
      })
      if (!remove) {
        !flagsTemp ? flagsTemp = [] : flagsTemp = JSON.parse(localStorage.getItem('flags'));
        flagsTemp.push(position);
        localStorage.setItem("flags", JSON.stringify(flagsTemp));
      }
      setFlags(JSON.parse(localStorage.getItem('flags')));
    }
    if (e.type === 'click') {
      const url = 'https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/play/uncover';
      const body = { board: data.board, position: position, size: data.size, minesAmount: data.minesAmount };
      await axios.post(url, body)
        .then(res => {
          if (res.data.status && res.data.status === 'game over') {
            setStatus(res.data.status);
          } else {
            setStatus(res.data.status);
          }
          setData(res.data)
        })
        .catch(e => console.log(e.message))
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.containerChrome}>
        <div className={classes.Container}>
          <video autoPlay='autoplay' loop='loop' muted className={classes.Video}>
            <source src={'https://static.videezy.com/system/resources/previews/000/004/296/original/20_20Dragon_20Coaster_20Part_204.mp4'} type='video/mp4' />
          </video>
          <div className={classes.Content}>
            <Grid>
              <Grid item xs={12} sm={6}>
                {!gameOn ? (
                  !instructionsOn ? (
                    <Menu handleStart={handleStart} />
                  ) : (
                      <Instructions />
                    )
                ) : (!status ?
                  <Board data={data} handleClick={handleClick} flags={flags} /> :
                  <Banner status={status} />
                  )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;