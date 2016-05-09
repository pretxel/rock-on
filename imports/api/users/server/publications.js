import { Meteor } from 'meteor/meteor';
import { Matches } from '../../../api/matches/matches.js';

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});
