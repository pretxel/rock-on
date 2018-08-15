import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

const App = (props) => (
    <div>
      <section id="menu"></section>
      {props.main}
    </div>
  );
  
  export default AppContainer = withTracker(props => {
    // props here will have `main`, passed from the router
    // anything we return from this function will be *added* to it
    return {
      user: Meteor.user(),
    };
  })(App);