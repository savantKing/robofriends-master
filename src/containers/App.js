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
  

  const [robots, robotState] = useState([]);
  const [searchfield, stateSearchField] = useState('');


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { robotState(users) });   
  }, []);


  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={stateSearchField} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);