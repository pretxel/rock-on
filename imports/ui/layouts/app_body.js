import './app_body.html';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Matches } from '../../api/matches/matches.js';


Template.App_body.onCreated(function() {
  this.state = new ReactiveDict();
  this.autorun(() => {
    this.subscribe('userStatus');
    // this.subscribe('showMatches');
  });
  // console.log(Meteor.users.find({ "status.online": true }));
});



Template.App_body.onRendered(function () {
  console.log("INIT");
  // console.log(Matches.find().count());
});


Template.App_body.helpers({
  emailLocalPart() {
    const email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  usersCount() {
    return Meteor.users.find({ "status.online": true }).count();
  }
});


Template.App_body.events({

  'click .js-logout'() {
    Meteor.logout();
  },

});
