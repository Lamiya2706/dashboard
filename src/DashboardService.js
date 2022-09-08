import { Container, Grid, makeStyles, Paper, Typography, TableRow, TableCell } from '@material-ui/core';
import React from 'react';
import { CustomTable } from 'components-project-sample'
import { useServiceContext } from 'shell/Service';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
}));

const thData = [
  {
    name: 'Dessert (100g serving)',
    align: 'left'
  },
  {
    name: 'Calories',
    align: 'right'
  },
  {
    name: 'Fat&nbsp;(g)',
    align: 'right'
  },
  {
    name: 'Carbs&nbsp;(g)',
    align: 'right'
  },
  {
    name: 'Protein&nbsp;(g)',
    align: 'right'
  }
]



export default function Dashboard() {
  const classes = useStyles();
  const serviceContext = useServiceContext();

  React.useEffect(() => {
    serviceContext.setService({ title: 'Dashboard' });
  }, []);

  function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const tableRows = () => (
    rows.map((row) => (
      <TableRow
        key={row.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
    ))
  )

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h6" color="primary" gutterBottom>
              Dashboard App
            </Typography>
            <CustomTable rows={tableRows} tableHeaderData={thData} />
          </Paper>
        </Grid>
      </Container>
    </main>
  );
}
