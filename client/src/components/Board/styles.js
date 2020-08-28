import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 110,
    marginBottom: 10,
  },
  covered: {
    position: 'relative',
    height: 15,
    width: 15,
    backgroundColor: '#999',
    borderRadius: 1,
    margin: 0.5,
    borderColor: '#848181',
    borderTopColor: '#d0cfcf',
    borderLeftColor: '#d0cfcf',
    borderWidth: 4,
    borderStyle: 'solid',
    fontSize: 12,
    fontWeight: 900,
  },
  uncovered: {
    position: 'relative',
    height: 15,
    width: 15,
    backgroundColor: '#999',
    borderRadius: 1,
    margin: 0.5,
    borderColor: '#999',
    borderTopColor: '#999',
    borderLeftColor: '#999',
    borderWidth: 4,
    borderStyle: 'solid',
    fontSize: 12,
    fontWeight: 700,
  },
}));