import { Meteor } from 'meteor/meteor';

import { TimeStuff } from '../api.js';

import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  var currentData = TimeStuff.findOne({ group: "ourgroup"});
  if (currentData === undefined) {
    console.log("Added default group");
    TimeStuff.insert({ group: "ourgroup", people:[], proposals: [] });
  }

  Meteor.methods({
    addTime: function(iTimeHr, iTimeMin) {
      var date = new Date();
      date.setHours(iTimeHr,iTimeMin,0,0); //Set seconds and ms to zero
      var existingTime = TimeStuff.findOne({ group: "ourgroup", proposals: {$elemMatch: {leavingTime: date} } });
      if (existingTime === undefined) {
        TimeStuff.update(
          { group : "ourgroup"},
          { $push: { proposals: { leavingTime: date, voting: [] } } }
        );
      }
      console.log(existingTime);

    }
  });

  Accounts.onCreateUser((options, user) => {
  TimeStuff.update({group: "ourgroup"},
    {$push: {people: user._id}});
  // Don't forget to return the new user object at the end!
  return user;
  });
});

