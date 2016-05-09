import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class MatchesCollection extends Mongo.Collection {

}

export const Matches = new MatchesCollection('Matches');

Matches.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Matches.schema = new SimpleSchema({
  text: {
    type: String,
    max: 100,
  },
  user1: {
    type: Object,
  },
  "user1.id": {
    type: String,
  },
  "user1.total": {
    type: Number,
  },
  user2: {
    type: Object,
  },
  "user2.id": {
    type: String,
  },
  "user2.total": {
    type: Number,
  },
  available: {
    type: Boolean,
    defaultValue: false,
  },
  tracks: {
    type: [Object],
    optional: true
  },
  "tracks.$.track_id": {
    type: String,
    optional: true
  },
  "tracks.$.user_id": {
    type: String,
    optional: true
  },
});

Matches.attachSchema(Matches.schema);
