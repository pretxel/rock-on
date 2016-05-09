import { Meteor } from 'meteor/meteor';
import { Matches } from "../matches.js";

Meteor.publish("showMatches", function() {
  return Matches.find({available : true});
});
