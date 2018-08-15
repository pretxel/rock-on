import React, { Component }  from 'react';
import PropTypes from 'prop-types';


export default class ListPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
   
  }



  render() {
    return (
      <div className="page lists-show">
        <h1>HOLA: {this.props.id}</h1>
      </div>
    );
  }
}

ListPage.propTypes = {
  id: PropTypes.number,
//   todos: PropTypes.array,
//   loading: PropTypes.bool,
//   listExists: PropTypes.bool,
//   menuOpen: PropTypes.object.isRequired,
};
