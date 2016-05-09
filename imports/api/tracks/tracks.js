import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class TracksCollection extends Mongo.Collection {

}

export const Tracks = new TracksCollection('tracks');

Tracks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Tracks.schema = new SimpleSchema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  url: {
    type: String,
  },
});

Tracks.attachSchema(Tracks.schema);
