import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radium, { StyleRoot } from 'radium';
import { merge, bounce, wobble } from 'react-animations';
import { useStyles } from './styles';

const bounceWobble = merge(bounce, wobble);

function Board({ data, handleClick, flags }) {
  let boardLayout = data && data.board ? JSON.parse(JSON.stringify(data.board)) : [];
  let size = [];
  if (data) {
    for (let i = 0; i < data.size; i++) {
      size.push(i);
    };
  }

  if (boardLayout[0] && flags && flags[0]) {
    flags.map(flag => {
      boardLayout[flag[0]][flag[1]] = -2;
      return true;
    });
  }

  const classes = useStyles();

  const movement = {
    animation: {
      animation: 'x 20s infinite',
      animationName: Radium.keyframes(bounceWobble)
    }
  };

  return (
    <StyleRoot>
      <div style={movement.animation}>
        <Grid container className={classes.root} spacing={0}>
          {size.map((file, n) => (
            <Grid item xs={12} key={n}>
              <Grid container justify="center" spacing={0}>
                {size.map((value, l) => (
                  <Grid key={value} item>
                    <Paper
                      className={typeof (boardLayout[file][value]) !== 'string' ?
                        classes.covered :
                        classes.uncovered}
                      onClick={boardLayout[file][value] !== -2 ? (e) => handleClick(e, [n, l]) : null}
                      onContextMenu={(e) => handleClick(e, [n, l])}
                    >
                      {typeof (boardLayout[file][value]) === 'string' ?
                        boardLayout[file][value] :
                        boardLayout[file][value] === -2 ? '🚩' :
                          null}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </StyleRoot>
  );
};

export default Board;