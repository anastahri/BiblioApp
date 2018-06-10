import { ReactiveDict } from 'meteor/reactive-dict';
import { adminAddUser } from '../../../../config/admin_methods.js';

Template.addUser.onCreated(function() {
  this.error = new ReactiveDict();
  this.success = new ReactiveDict();
});

Template.addUser.helpers({
  showError: function() {
    return Template.instance().error.get('message');
  },
  showSuccess: function() {
    return Template.instance().success.get('message');
  }
});

Template.addUser.events({
  'submit .addUser'(event, instance) {
    event.preventDefault();
    instance.error.set({'message': false});
    instance.success.set({'message': false});
    const data = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      passwordConfirmation: event.target.passwordConfirmation.value,
      roles: event.target.role.value
    };
    adminAddUser.call(data, (err, res) => {
      if (err) {
        if (err.error === 'validation-error') {
          instance.error.set({'message': err.reason});
        }
      } else {
        instance.success.set({'message': "User added."});
      }
    });
  }
});