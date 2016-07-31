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
    var docStuff = TimeStuff.find({ group: "ourgroup" }, { "times": 1 }).fetch();
    if (docStuff[0] === undefined) {
      return [];
    }
    return docStuff[0].times;
  }
})