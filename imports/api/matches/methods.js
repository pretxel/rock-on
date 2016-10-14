import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Matches } from './matches.js';

const MATCHES_ID_ONLY = new SimpleSchema({
  _id: { type: String },
}).validator();

const MATCHES_ID_USER = new SimpleSchema({
  _id: { type: String },
  user_id: { type: String },
}).validator();

const MATCHES_ID_WITH_TRACK = new SimpleSchema({
  _id: { type: String },
  track_id: { type: String },
  user_id: { type: String },
}).validator();


export const insert = new ValidatedMethod({
  name: "matches.insert",
  validate: new SimpleSchema({
    text: { type: String },
    userId1: { type: String },
    userId2: { type: String },
  }).validator(),
  run({text, userId1, userId2}){

    const user1 = {
      id: userId1,
      total: 0
    };

    const user2 = {
      id: userId2,
      total: 0
    };

    const match = {
      text,
      user1: user1,
      user2: user2,
      available: true,
      createdAt: new Date(),
    };
    Matches.insert(match);
  },
});

export const addTrack = new ValidatedMethod({
  name: "matches.addTrack",
  validate: MATCHES_ID_WITH_TRACK,
  run({_id, track_id, user_id}){

    const track = {
      track_id,
      user_id
    };

    var selectedTrack = Matches.find({"_id": _id,  "tracks" : track }).count();
    var match = Matches.findOne({ $and: [ {"available": true}, { $or : [{"user1.id" : Meteor.userId()}, {"user2.id" : Meteor.userId()}] }  ]   });
    var totalSelected = 0;

    if (match.tracks != undefined){
      match.tracks.forEach(function(currentValue,index,arr){
        if (currentValue.user_id === Meteor.userId()){
            totalSelected++;
        }
      });
    }

    if (totalSelected < 3){
      if (selectedTrack === 0){
        Matches.update(_id, {$push: { "tracks" : track }});
      }
    }else{
      throw new Meteor.Error("tracks-exceded", "You have three tracks selected");
    }


    // console.log("sada");
  },
});

export const removeTrack = new ValidatedMethod({
  name: "matches.removeTrack",
  validate: MATCHES_ID_WITH_TRACK,
  run({_id, track_id, user_id}){
    const track = {
      track_id,
      user_id
    };
    Matches.update({"_id": _id} , {$pull: { "tracks" : track }});
  },
});


export const exit = new ValidatedMethod({
  name: "matches.exit",
  validate: MATCHES_ID_ONLY,
  run({_id}){

    Matches.update(_id, {$set: { "available" : false }});
  },
});


export const finishGame = new ValidatedMethod({
  name: "matches.finishGame",
  validate: MATCHES_ID_ONLY,
  run({_id}){
    var match1 = Matches.findOne({"available" : true, "_id" : _id, "user1.id": Meteor.userId()});
    var match2 = Matches.findOne({"available" : true, "_id" : _id, "user2.id": Meteor.userId()});

    console.log(match1);
    console.log(match2);

  },
});