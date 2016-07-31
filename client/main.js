import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { TimeStuff } from '../api.js';

import './main.html'

Template.addTime.events({
  'click button'(event, instance) {
    var sTimeVals = $('#timepicker').val().split(" ");
    var iTimeHr = parseInt(sTimeVals[0].split(":")[0]);
    var iTimeMin = parseInt(sTimeVals[0].split(":")[1]);
    var sAMPM = sTimeVals[1];
    if (sAMPM === "PM") {
      iTimeHr += 12;
    }
    Meteor.call("addTime", iTimeHr, iTimeMin);
  }
})

Template.body.helpers({
  timeObjs() {
    var docStuff = TimeStuff.findOne({ group: "ourgroup" }, { "proposals": 1 });
    if (docStuff === undefined) {
      return [];
    }
    return docStuff.proposals;
  }
})

Template.timeTemplate.helpers({
  formatTime(dateObj) {
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    var sAMPM = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    var timeString = hours + ":" + minutes + " " + sAMPM;
    return timeString;
  }
});