import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GameContext from '../../contexts/GameContext';
import InstructionsContext from '../../contexts/InstructionsContext';
import DataContext from '../../contexts/DataContext';
import FlagContext from '../../contexts/FlagContext';
import BackupIcon from '@material-ui/icons/Backup';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#f50057'
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const { setGameOn } = useContext(GameContext);
  const { setInstructionsOn } = useContext(InstructionsContext);
  const { data, setData } = useContext(DataContext);
  const { flags, setFlags } = useContext(FlagContext);
  const [checkSaved, setCheckSaved] = useState(false);
  const [checkLoaded, setCheckLoaded] = useState(false);

  // Load menu
  const handleClick = () => {
    setGameOn(false);
    setInstructionsOn(false);
  };
  
  //Load instructions
  const handleClickInstructions = () => {
    setInstructionsOn(true);
  };

  // Save game in local storage and show green check icon
  const handleSave = () => {
    localStorage.setItem("dataSaved", JSON.stringify(data));
    localStorage.setItem("flagsSaved", JSON.stringify(flags))
    setGameOn(false);
    setCheckSaved(true);
    setTimeout(() => {
      setCheckSaved(false);
    }, 2000)
  };

  // Load game from local storage and show green check icon
  const handleLoad = () => {
    const savedFlags = JSON.parse(localStorage.getItem('flagsSaved'));
    const savedData = JSON.parse(localStorage.getItem('dataSaved'));
    setData(savedData);
    setFlags(savedFlags);
    setGameOn(true);
    setCheckLoaded(true);
    setTimeout(() => {
      setCheckLoaded(false);
    }, 2000)
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h4" className={classes.title} color="error">
            RCM
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleClick()}
            style={{ marginRight: 15 }}>
            Menu
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleClickInstructions()}
            style={{ marginRight: 15 }}>
            How to play
          </Button>
          {checkSaved ? (
            <CloudDoneIcon
              style={styles.cloudCheck}
            />
          ) : (
              <Tooltip title="Save Game">
                <BackupIcon
                  style={styles.cloud}
                  onClick={handleSave}
                />
              </Tooltip>
            )}
          {checkLoaded ? (
            <CloudDoneIcon
              style={styles.cloudCheck}
            />
          ) : (
              <Tooltip title="Load Game">
                <CloudDownloadIcon
                  style={styles.cloud}
                  onClick={handleLoad}
                />
              </Tooltip>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}