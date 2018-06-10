import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { editProfile } from '../../../config/admin_methods.js';

Template.profile.onCreated(function() {
  this.error = new ReactiveDict();
  this.success = new ReactiveDict();
});

Template.profile.helpers({
  userEmail: function() {
    if (Meteor.user())
      return Meteor.user().emails[0].address;
    return '';
  },
  showError: function() {
    return Template.instance().error.get('message');
  },
  showSuccess: function() {
    return Template.instance().success.get('message');
  }
});

Template.profile.events({
  'submit .updateProfile'(event, instance) {
    event.preventDefault();
    instance.error.set({'message': false});
    instance.success.set({'message': false});
    const data = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      passwordConfirmation: event.target.passwordConfirmation.value
    };
    editProfile.call(data, (err, res) => {
      if (err) {
        if (err.error === 'validation-error') {
          instance.error.set({'message': err.reason});
        }
      } else {
        instance.success.set({'message': "Profile updated."});
      }
    });
  }
});
