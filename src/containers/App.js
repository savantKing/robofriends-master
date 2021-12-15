import './App.css';

import React, { useEffect } from 'react';
import { requestRobots, setSearchField } from '../actions.js';

import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
};

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from reducers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

function App(props) {


  // const [robots, robotState] = useState([]);
  useEffect(() => {
    props.onRequestRobots();
  }, []);



  //const { robots, searchField, onSearchChange, isPending } = props;
  const filteredRobots = props.robots.filter(robot => {
    return robot.name.toLowerCase().includes(props.searchField.toLowerCase());
  });
  return !props.robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={props.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);