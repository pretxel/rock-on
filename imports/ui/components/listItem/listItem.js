import "./listItem.html"
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var';
import { addTrack, removeTrack } from '../../../api/matches/methods.js';
import { Matches } from '../../../api/matches/matches.js';

var offset = 50000;
var widget;

Template.listItem.onCreated(function(){
  this.seconds = new ReactiveVar(0);
  this.selected = new ReactiveVar();
  var instance = Template.instance();
  var countTrack = Matches.find({"_id": instance.data.matchID, "tracks" : {"track_id" : instance.data.track._id, "user_id" : Meteor.userId() } }).count();
  if (countTrack > 0){
    this.selected.set("head-selected");
  }else {
    this.selected.set("");
  }

});

Template.listItem.onRendered(function(){
  console.log("Render - " + this.data.track.url);

  // var widgetIframe = Template.instance.find("#sc-widget");
  var instance = Template.instance();
  var widgetIframe = instance.find("iframe#sc-widget");
  widget = SC.Widget(widgetIframe);

  this.data = Template.currentData();

  var url_sound = this.data.track.url;

  widget.load(url_sound, {
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
    
    $("iframe").hide();

  });




});

Template.listItem.events({
  'click .circular'(event, instance){
    console.log("PLAY");
    var widgetIframe = instance.find("iframe#sc-widget");
    var widget = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.PLAY, function() {
      widget.seekTo(offset);
      setTimeout(function(){
        console.log('STOP 10')
      },1000);
      // $("#gifWave").show();
    });

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(obj) {
      //console.log(obj);
      var currentPosition = obj.currentPosition / 1000;
      // console.log(Math.floor(currentPosition) - Math.floor(offset/1000));
      instance.seconds.set(Math.floor(currentPosition) - Math.floor(offset/1000));
      if ((currentPosition - (offset/1000)) > 10 ){
        // $("#gifWave").hide();
        widget.pause();
        // widget.next();
      }
    });

    widget.bind(SC.Widget.Events.PAUSE, function(obj) {
      console.log('STOP')
    });

    widget.seekTo(offset);
    widget.play();
    instance.seconds.set(0);
    // setTimeout(function(){console.log('STOP')},10000);

  },
  'click .titleTrack'(event, instance){
    console.log("ID Match - " + instance.data.matchID);
    console.log("ID Track - " + instance.data.track._id);

    if (instance.selected.get()){
      // Remove Track
      console.log("REMOVE");
      removeTrack.call({
        _id: instance.data.matchID,
        track_id: instance.data.track._id,
        user_id: Meteor.userId()
      }, function(error){
        if (error){
          console.log(error);
        }else{
          instance.selected.set("");
        }
      });

    } else {
      console.log("ADD");
      // Add Track
      addTrack.call({
        _id: instance.data.matchID,
        track_id: instance.data.track._id,
        user_id: Meteor.userId()
      }, function(error){
        if (error){
          instance.$("div#message-error").show();
          instance.$("div#message-error .header").html(error.message);
          console.log(error);
        }else {
          instance.selected.set("head-selected");
        }
      });

    }

  },
  'click .close'(event, instance){
    instance.$("div#message-error").closest('.message').hide();
  },
});

Template.listItem.helpers({
  seconds() {
    const instance = Template.instance();
    return instance.seconds.get();
  },
  selected() {
    const instance = Template.instance();
    return instance.selected.get();
  },

});
