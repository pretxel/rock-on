import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ListPage from '../pages/ListPage.js';

export default ListPageContainer = withTracker(({ id }) => {
//   const todosHandle = Meteor.subscribe('todos.inList', id);
//   const loading = !todosHandle.ready();
//   const list = Lists.findOne(id);
//   const listExists = !loading && !!list;
  return {
    // loading,
    // list,
    // listExists,
    // todos: listExists ? list.todos().fetch() : [],
    id: id
  };
})(ListPage);