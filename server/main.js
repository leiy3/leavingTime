import { Meteor } from 'meteor/meteor';

import { TimeStuff } from '../api.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    addTime: function(iTimeHr, iTimeMin) {
      var date = new Date();
      date.setHours(iTimeHr,iTimeMin,0); //Set seconds to zero
      console.log("");
    }
  })
});
