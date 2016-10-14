import "./main.html"
import "../listItem/listItem.html"
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Matches } from '../../../api/matches/matches.js';
import { Tracks } from '../../../api/tracks/tracks.js';
import { insert, exit } from '../../../api/matches/methods.js';


var name = 'rock-battle';

var myMatcher = new RandomOpponentMatcher(name);

Template.main.onCreated(function() {
  this.state = new ReactiveDict();
  this.countSelected = new ReactiveVar(0);
  this.percentTotal = new ReactiveVar(0);
  this.matchID = new ReactiveVar(333);
  this.state.setDefault({
    findOpponent: false,
    inMatch: false,
  });
  this.autorun(() => {
    this.subscribe('showMatches');
    this.subscribe('showTracks');
  });
});

Template.main.onRendered(function(){
  var isConnected = Meteor.status().connected;




});

Template.main.onDestroyed(function(){
  myMatcher.remove();
  exit.call({
    _id: instance.matchID.get(),
  });
});

Template.main.events({

  'click .start-match'(event, instance){

    myMatcher.add();
    instance.state.set('findOpponent', true);

  },
  'click .exit-match'(event, instance){
    myMatcher.remove();
    instance.state.set('findOpponent', false);
    exit.call({
      _id: instance.matchID.get(),
    });
  },
  'click .ready'(event, instance){

    var match = Matches.findOne({ $or : [{"user1.id" : Meteor.userId()}, {"user2.id" : Meteor.userId()}] });
    var totalSelected = match.tracks.length;
    if (totalSelected === 6){
      FlowRouter.go('/play/'+instance.matchID.get());
    } else {
      console.log('Espera por favor ');
      //instance.$('.ui.modal').show();
      instance.$('.ui.modal').fadeIn('slow');
      // Wait until other user is ready
    }
  },
  'click .hide-modal'(event, instance){
    instance.$('.ui.modal').fadeOut('slow');
  },
});

Template.main.helpers({
  findOpponent() {
    const instance = Template.instance();
    return instance.state.get('findOpponent') && 'findOpponent';
  },
  matchStatus() {
    const instance = Template.instance();
    var numMat = Matches.find({ $or : [{"user1.id" : Meteor.userId()}, {"user2.id" : Meteor.userId()}] }).count();
    var match = Matches.findOne({ $or : [{"user1.id" : Meteor.userId()}, {"user2.id" : Meteor.userId()}] });
    if (numMat === 0){
      return false;
    }else{
      instance.matchID.set(match._id);
      instance.state.set('findOpponent', false);
      instance.$("div#progressTracks").progress({percent:instance.percentTotal.get()});

      return true;
    }
  },
  tracks() {
    // console.log(Tracks.find({},{title : 1, author: 1}));
    return Tracks.find({});
  },
  matchID(){
    const instance = Template.instance();
    return instance.matchID.get();
  },
  countSelectTracks() {
    const instance = Template.instance();
    var match = Matches.findOne({ $or : [{"user1.id" : Meteor.userId()}, {"user2.id" : Meteor.userId()}] });
    var totalSelected = 0;
    var percentTotal = 0;
    if (match.tracks != undefined){
      match.tracks.forEach(function(currentValue,index,arr){
        if (currentValue.user_id === Meteor.userId()){
            percentTotal = percentTotal + 33.33;
            totalSelected++;
        }
      });
    }
    percentTotal = Math.ceil(percentTotal);
    instance.countSelected.set(totalSelected);
    instance.percentTotal.set(percentTotal);
    instance.$("div#progressTracks").progress({percent:percentTotal});
    return instance.countSelected.get();
  },
  ready(){
    const instance = Template.instance();
    let countSelected = instance.countSelected.get();
    if (countSelected === 3){
      return true;
    }else{
      return false;
    }
  },
});
