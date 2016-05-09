import { Meteor } from 'meteor/meteor';
import { Tracks } from "../tracks.js";

Meteor.publish("showTracks", function() {
  return Tracks.find();
});
