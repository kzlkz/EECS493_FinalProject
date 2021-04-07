import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
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
      activities: [
        {'name':'493 Prototype', 'category':'work', 'duration':2, 'complete':false},
        {'name':'watch a movie', 'category':'entertainment', 'duration':3, 'complete':false}
      ],
      show_list: 'visible',
      show_graphs: 'hidden'
    };
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
        <ListPanel activities={this.state.activities}/>
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
    this.state = {

    };
  }

  render() {
    return (
    <div id='list_panel'>
    List panel
    <p>{this.props.activities[0].name}</p>
    
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Activities</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Duration (hrs)</TableCell>
              <TableCell align="right">Complete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.activities.map((activity) => (
              <TableRow key={activity.name}>
                <TableCell component="th" scope="row">
                  {activity.name}
                </TableCell>
                <TableCell align="right">{activity.category}</TableCell>
                <TableCell align="right">{activity.duration}</TableCell>
                <TableCell align="right">{activity.complete}</TableCell>
              </TableRow>
            ))}
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
