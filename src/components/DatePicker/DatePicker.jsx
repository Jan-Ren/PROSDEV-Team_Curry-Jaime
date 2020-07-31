import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2020-07-18'));
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date('2020-07-19'));

  const handleDateFromChange = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateToChange = (date) => {
    setSelectedDateTo(date);
  };

  return (
    <Grid 
      container
      direction="row"
      spacing={3}
      alignItems="flex-start"
      justify="flex-start"> 
     <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="From"
            value={selectedDateFrom}
            onChange={handleDateFromChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item>
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="To"
            format="MM/dd/yyyy"
            value={selectedDateTo}
            onChange={handleDateToChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
          
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
