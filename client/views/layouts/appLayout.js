import { Template } from 'meteor/templating';
import moment from 'moment';

Template.userMenu.events({
	'click #sign_out'(event){
		event.preventDefault();
		AccountsTemplates.logout();
	},
});

Template.userMenu.helpers({
  userEmail: function() {
    return Meteor.user().emails[0].address;
  },
  userName: function() {
    return Meteor.user().username;
  },
  memberSince: function() {
    return moment(Meteor.user().createdAt).format('MMMM D YYYY');
  }
});