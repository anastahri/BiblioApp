import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import moment from 'moment';

import './allUsers.html';

Template.allUsers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsers');
	});
});

Template.allUsers.helpers({
	users: function() {
		return Meteor.users.find();
	},
	userEmail: function() {
		return this.emails[0].address;
	},
	isAdmin: function() {
		return Roles.userIsInRole(this._id, 'admin') ? 'Yes' : 'No';
	},
	isAdminButton: function() {
		return Roles.userIsInRole(this._id, 'admin') ? 'btn-danger' : 'btn-success';
	},
	momentCreatedAt: function() {
		return moment(this.createdAt).format('MMMM D YYYY HH:mm');
	}
});

Template.allUsers.events({
	'click .userElt': function() {
		console.log(this);
		Session.set('selectedUser', this);
	},
	'click .toggle-admin': function() {
		if(Meteor.userId() != this._id)
			Meteor.call('toggleAdmin', this._id);
	},
	'click .deleteUser': function() {
		if(Meteor.userId() != this._id)
			Meteor.call('removeUser', this._id);
	}
});

