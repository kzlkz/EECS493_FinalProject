import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import DoughnutChart from './charts/DoughnutChart'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'

const catOptions = [
  'work', 'entertainment', 'personal'
];
// const menu = catOptions.map( (opt) =>
//   <MenuItem value={opt}>{opt}</MenuItem>
// )

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    let { date } = this.state;
    date = date.toUTCString();
    return (
      <div id='container'>
        <div id='heading'>
          <div id='greeting'>
            <p>How is your day, Luna?</p>
          </div>
          <div id='date'>
            <p>Date: {date}</p>
          </div>
        </div>
        <Contents />
      </div>
    );
  }
}

class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // activities: {
      //   '2021-04-08':{
      //     1:{'name':'493 Prototype', 'category':'work', 'duration':2, 'complete':false, 'editable': true},
      //     2:{'name':'watch a movie', 'category':'entertainment', 'duration':3, 'complete':false, 'editable': true}
      //   }
      // },
      activities: [
        {'name':'493 Prototype', 'category':'work', 'duration':2, 'complete':true, 'editable': true},
        {'name':'492 Prototype', 'category':'work', 'duration':2, 'complete':true, 'editable': true},
        {'name':'watch a movie', 'category':'entertainment', 'duration':3, 'complete':false, 'editable': true}
      ],
      show_list: 'visible',
      show_graphs: 'hidden'
    };
    this.updateName = this.updateName.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
  }

  clickList = () => {
    this.setState({
      show_list: 'visible',
      show_graphs: 'hidden'
    });
  }

  updateName = (event) => {
    if (event.code === 'Enter') {
      for (let i = 0; i<this.state.activities.length; i++) {
        if (this.state.activities[i].name === event.target.name){
          let new_activities = this.state.activities;
          new_activities[i].name = event.target.value;
          this.setState({
            activities: new_activities
          }
          )
        }
      }
    }
  }


  updateDuration = (event) => {
    if (event.code === 'Enter') {
      const time = event.target.value;
      for (let i = 0; i<this.state.activities.length; i++) {
        // check name
        if (this.state.activities[i].name === event.target.name){
          if (isNaN(time) || time < 0){
            alert('Duration should be a positive numeric value');
          } else {
            let new_activities = this.state.activities;
            new_activities[i].duration = parseFloat(time);
            console.log(time);
            this.setState({
              activities: new_activities
            }, () => {
              console.log("new")
              console.log(this.state.activities)
            })
          }
        }
      }
    }
  }


  clickGraphs = () => {
    this.setState({
      show_list: 'hidden',
      show_graphs: 'visible',
    });
  }

  render() {
    const { activities } = this.state;
    const list = activities.map((a) =>  {
      return(
      <p>{a.name}  {a.Duration}   {a.category}</p>
      )
    }
    );
    console.log(activities)
    return (
    <div id='contents'>
      <div>{list}</div>
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
        <ListPanel activities={this.state.activities} updateDuration={this.updateDuration} updateName={this.updateName}/>
      </div>
      <div style={{visibility:this.state.show_graphs}}>
        <GraphPanel activities={this.state.activities}/>
      </div>
    </div>
    );
  }
}


class ListPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  editButtonOnClick = () => {

  }


  confirmButtonOnClick = () => {

  }


  cancelButtonOnClick = () => {

  }

  categoryChange = (event) => {
  }

  /*
  updateName = (event) => {
    if (event.code === 'Enter') {
      for (let i = 0; i<this.props.activities.length; i++) {
        if (this.props.activities[i].name === event.target.name){
          this.props.activities[i].name = event.target.value;
        }
      }
    }
  }

  updateDuration = (event) => {
    if (event.code === 'Enter') {
      const time = event.target.value;
      console.log(time);
      for (let i = 0; i<this.props.activities.length; i++) {
        // check name
        if (this.props.activities[i].name === event.target.name){
          if (isNaN(time) || time < 0){
            alert('Duration should be a positive numeric value');
            event.value = this.props.activities[i].Duration;
          } else {
            this.props.activities[i].Duration = time;
          }
        }
      }
    }
  }
  */

  check = (event) => {
    for (let i = 0; i<this.props.activities.length; i++) {
      if (this.props.activities[i].name === event.target.name){
        this.props.activities[i].complete = event.target.checked;
      }
    }
  }

  generateDynamicRow = ({name, category, duration, complete, editable}) => {
    return (
      <TableRow key={name}>
        <TableCell align="right">
          <Input name={name} defaultValue={name} onKeyDown={this.props.updateName}/>
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
          <Input name={name} defaultValue={duration} onKeyDown={this.props.updateDuration}/>
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
            {this.props.activities.map((activity) => 
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
      activities: this.props.activities
    };
  }

  render() {
    return (
      <div id='graph_panel'>
        Graph panel
        <p>{this.props.activities[0].name}</p>
        <p>{this.props.activities[0].complete?'true': 'false'}</p>
        <DoughnutChart daily_activity={this.state.activities} />
        <LineChart daily_activity={this.state.activities} />
        <PieChart daily_activity={this.state.activities} />
      </div>
    );
  }
}

export default App;