import { Meteor } from 'meteor/meteor';

import { TimeStuff } from '../api.js';

Meteor.startup(() => {
  // code to run on server at startup
  var currentData = TimeStuff.find({ group: "ourgroup "});
  if (currentData === null) {
    console.log("should not print");
    TimeStuff.insert({ group: "ourgroup", times: [] });
  }

  Meteor.methods({
    addTime: function(iTimeHr, iTimeMin) {
      var date = new Date();
      date.setHours(iTimeHr,iTimeMin,0); //Set seconds to zero
      TimeStuff.update(
        { group : "ourgroup"},
        { $push: { times: date } }
      );
    }
  })
});

