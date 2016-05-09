import "./play.html"
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
// import { ReactiveArray } from 'quietcreep/reactive-array';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Matches } from '../../../api/matches/matches.js';
import { Tracks } from '../../../api/tracks/tracks.js';

let offset = 50000;
let clock = 10;
let interval;
let matchId = 0;
let widgetIframe;
let widget;
let tracks;
var tracksArray = [];
let track = 0;
let arrayIndexAnswers = [];
let arrayAnswers = [];

Template.play.onCreated(function() {

  matchId = FlowRouter.getParam("matchId");
  let exist = Matches.find({ $and: [{ "_id": matchId }, {$or : [{"user1.id" : Meteor.userId()}, {"user2.id" : Meteor.userId()}] } ] }).count();
  if (exist === 0){
    FlowRouter.go('/');
  }
  tracks = new ReactiveDict();
  track = (Session.get('track') == undefined) ? 0 : Session.get('track');
  let match = Matches.findOne({"_id": matchId});
  let ind = 1;
  match.tracks.forEach(function(currentValue,index,arr){
    if (currentValue.user_id != Meteor.userId()){
        let track = Tracks.findOne({"_id": currentValue.track_id});
        tracks.set('track'+ind , track.url);
        tracksArray[ind] = track;
        console.log('track'+ind + ' : ' + track.url);
        ind++;
    }
  });


});

Template.play.onRendered(function() {
  var instance = Template.instance();
  widgetIframe = instance.find("iframe#sc-widget");
  widget = SC.Widget(widgetIframe);

  widget.load(tracks.get('track1'), {
    auto_play: false,
    show_comments: false,
    show_user: false,
    download: false,
    liking: false,
    buying: false,
    show_playcount: false,
    sharing: false
  });

  widget.bind(SC.Widget.Events.READY, function() {
    console.log("CARGADO TRACK");
    $("iframe").hide();
    initTimer();
  });

  widget.bind(SC.Widget.Events.PLAY, function() {
    widget.seekTo(offset);
    // $("#gifWave").show();
  });

  widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(obj) {
    //console.log(obj);
    var currentPosition = obj.currentPosition / 1000;
    // console.log(Math.floor(currentPosition) - Math.floor(offset/1000));
    // instance.seconds.set(Math.floor(currentPosition) - Math.floor(offset/1000));
    if ((currentPosition - (offset/1000)) > 10 ){
      // $("#gifWave").hide();
      widget.pause();
      // widget.next();
    }
  });



});

Template.play.onDestroyed(function() {
  console.log('SALIO');
});

Template.play.events({
  'click .option'(event, instance) {

    let selectedID = $(event.currentTarget).attr("data");
    if (tracksArray[track]._id === selectedID){
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }
    initTimer();

  },
});

Template.play.helpers({
  time(){
    return Session.get('time');
  },
  answersIndex(){
    const instance = Template.instance();
    return Session.get('arrayIndexAnswers');
  },
  answers(){
    const instance = Template.instance();
    return Session.get('arrayAnswers');
  },
});


var timer = function (){
  if (clock > 0) {
    clock--;
    Session.set('time', clock);
    return;
  } else {
    initTimer();
    return;
  }
}

var init = function () {
  track = (Session.get('track') == undefined) ? 0 : Session.get('track');
  clock = 10;
  Session.set('time', clock);
};

var initTimer = function () {
  $('.loader-track').removeClass('disabled');
  $('.loader-track').addClass('active');
  $('.loader-playing').removeClass('active');
  $('.loader-playing').addClass('disabled');
  Meteor.clearInterval(interval);
  widget.pause();
  init();
  let track = (Session.get('track') == undefined) ? 0 : Session.get('track');
  console.log("Finish Time Track: " + track);
  if (track < 3){
    track++;
    Session.set('track', track);

    widget = SC.Widget(widgetIframe);

    //TODO: create offset dynamic


    console.log(tracksArray[track].title);
    // Generate answers
    let tracksOptions = Tracks.find({"_id" : { $ne : tracksArray[track]._id}}).fetch();
    let tracksOptionsCount = Tracks.find({"_id" : { $ne : tracksArray[track]._id}}).count();
    arrayAnswers = [];
    arrayAnswers.push(tracksArray[track]);
    let countAnswers = 1;
    tracksOptions.forEach(function(currentValue,index,arr){
        if (countAnswers < 3){
          let numRand = Math.floor((Math.random() * tracksOptionsCount) + 1);
          arrayAnswers.push(arr[numRand-1]);
          //TODO: validate two options are not equals
        }else {
          return;
        }
        countAnswers++;
    });
    //Arrays answers
    arrayIndexAnswers = randomAnswers();
    arrayAnswers = reorderArray(arrayAnswers,arrayIndexAnswers);
    Session.set('arrayIndexAnswers',arrayIndexAnswers);
    Session.set('arrayAnswers',arrayAnswers);
    console.log(arrayIndexAnswers);


    console.log("NEXT: " + tracks.get('track' + (track)));
    widget.load(tracks.get('track' + track), {
      auto_play: false,
      show_comments: false,
      show_user: false,
      download: false,
      liking: false,
      buying: false,
      show_playcount: false,
      sharing: false
    });

    Meteor.setTimeout(function(){
      $('.loader-track').removeClass('active');
      $('.loader-track').addClass('disabled');
      $('.loader-playing').removeClass('disabled');
      $('.loader-playing').addClass('active');
      widget.seekTo(offset);
      widget.play();
      interval = Meteor.setInterval(timer, 1000);
    }, 2000);

  } else {
    console.log("Finish Game");
  }
};

var randomAnswers = function(){
  let indexTotal = 0;
  let randomArray = [];
  let randomReal = [];
  while (indexTotal<3){
    let numRan = Math.floor((Math.random() * 3) + 1);
    if (randomArray[numRan] == undefined){
      randomArray[numRan] = 1;
      randomReal.push(numRan);
      indexTotal++;
    }
  }
  return randomReal;
};


var reorderArray = function(array, arrayIndex){
  let newArrayOrder = [];
  array.forEach(function(value, index){
    let arrayInd =  arrayIndex[index];
    newArrayOrder.push(array[arrayInd - 1]);
  });
  return newArrayOrder;
};
