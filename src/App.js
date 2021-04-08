import React from 'react';
import Table from '@material-ui/core/Table';
import {TableBody, TableCell, TableContainer, TableHead,
        TableRow, Paper, Input, Select, MenuItem} from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const catOptions = [
  'work', 'entertainment', 'personal'
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  handleDateChange = (newDate) => {
    this.setState({date: newDate});
  }

  render() {
    return (
      <div id='container'>
        <div id='heading'>
          <div id='greeting'>
            <p>How is your day, Luna?</p>
          </div>
          <div id='date'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker value={this.state.date} onChange={this.handleDateChange} />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <Contents date={this.state.date}/>
      </div>
    );
  }
}

class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: {
        '2021-04-08':[ 
          {'name':'493 Prototype', 'category':'work', 'duration':2, 'complete':false},
          {'name':'watch a movie', 'category':'entertainment', 'duration':3, 'complete':false}
        ]
      },
      show_list: 'visible',
      show_graphs: 'hidden'
    };

    this.contentsDataHandler = this.contentsDataHandler.bind(this);
  }

  contentsDataHandler = (newActivities) => {
    this.setState({activities: newActivities});
  }

  clickList = () => {
    this.setState({
      show_list: 'visible',
      show_graphs: 'hidden'
    });
  }

  clickGraphs = () => {
    this.setState({
      show_list: 'hidden',
      show_graphs: 'visible',
    });
  }

  render() {
    // Get today's activities
    let today = this.props.date.toISOString().split('T')[0];
    let todayActivities = (today in this.state.activities) ? this.state.activities[today]: [];

    return (
    <div id='contents'>
      <div id='nav_bar'>
        <button
          type='button'
          onClick={this.clickList}
        >Show List</button>
        <button
          type='button'
          onClick={this.clickGraphs}
        >Show Graphs</button>
      </div>
      <div style={{visibility:this.state.show_list}}>
        <ListPanel todayActivities={todayActivities} contentsDataHandler={this.contentsDataHandler}/>
      </div>
      <div style={{visibility:this.state.show_graphs}}>
        <GraphPanel todayActivities={todayActivities} contentsDataHandler={this.contentsDataHandler}/>
      </div>
    </div>
    );
  }
}


class ListPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  updateName = (event) => {
    if (event.code === 'Enter') {
      for (let i = 0; i<this.props.todayActivities.length; i++) {
        if (this.props.todayActivities[i].name === event.target.name){
          this.props.todayActivities[i].name = event.target.value;
        }
      }
    }
  }

  updateDuration = (event) => {
    if (event.code === 'Enter') {
      const time = event.target.value;
      console.log(time);
      for (let i = 0; i<this.props.todayActivities.length; i++) {
        // check name
        if (this.props.todayActivities[i].name === event.target.name){
          if (isNaN(time) || time < 0){
            alert('Duration should be a positive numeric value');
            event.value = this.props.todayActivities[i].Duration;
          } else {
            this.props.todayActivities[i].Duration = time;
          }
        }
      }
    }
  }

  check = (event) => {
    for (let i = 0; i<this.props.todayActivities.length; i++) {
      if (this.props.todayActivities[i].name === event.target.name){
        this.props.todayActivities[i].complete = event.target.checked;
      }
    }
  }

  generateDynamicRow = ({name, category, duration, complete}) => {
    return (
      <TableRow key={name}>
        <TableCell align="right">
          <Input name={name} defaultValue={name} onKeyDown={this.updateName}/>
        </TableCell>
        <TableCell align="right">
          <Select
            value={category}
            onChange={this.categoryChange}
          > 
            <MenuItem value='work'>work</MenuItem>
            <MenuItem value='entertainment'>entertainment</MenuItem>
            <MenuItem value='personal'>persnoal</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="right">
          <Input name={name} defaultValue={duration} onKeyDown={this.updateDuration}/>
        </TableCell>
        <TableCell align="right">
          <input type='checkbox' name={name} value={complete?'checked':'unchecked'} onClick={this.check}/>
        </TableCell>
      </TableRow>
    )
  }

  render() {
    return (
    <div id='list_panel'>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Activities</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Duration (hrs)</TableCell>
              <TableCell align="left">Completion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.todayActivities.map((activity) => 
              this.generateDynamicRow(activity)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
  }
}

class GraphPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: []
    };
  }

  render() {
    return (
      <div id='graph_panel'>
        Graph panel
      </div>
    );
  }
}

export default App;


/*
TODO:
1. "delete" functionality
2. It seems like we can directly modify props in ListPanel inorder to change the state in Contents;
  should we do better by using "setState"?
3. how do we establish a one-two-one relationship between the data in the table and the data in the state?



*/
