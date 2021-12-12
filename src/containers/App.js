import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { connect } from 'react-redux';

import './App.css';

import { setSearchField } from '../actions';


const mapStateToProps = state => {
  return {
    searchField: state.searchfield
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

function App(props) {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }

  const [robots, robotState] = useState([]);
  const [searchfield, stateSearchField] = useState('');



  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response=> response.json())
  //     .then(users => {this.setState({ robots: users})});
  // }




  useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { robotState(users) });
    //console.log(robots, searchfield);
    // console.log(props.store.getState());
  }, []);



  //  const onSearchChange = (event) => {
  //     stateSearchField( event.target.value )
  //   }




  //const { robots, searchfield } = this.state;
  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={searchfield} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);