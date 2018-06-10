import { ValidatedMethod } from 'meteor/mdg:validated-method';

if (Meteor.isClient) {
  Meteor.subscribe("allUsers");
}

export const adminAddUser = new ValidatedMethod({
  name: 'Users.methods.adminInsert',
  validate: new SimpleSchema({
    username: { type: String, min: 5 },
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    password: { type: String, min: 6 },
    passwordConfirmation: { type: String, min: 6 },
    roles: { type: String, optional: true }
  }).validator(),
  run(newUser) {
    if (Meteor.users.findOne({ 'username': newUser.username })) {
      throw new Meteor.Error('validation-error', 'Username already exists.');
    }
    if (Meteor.users.findOne({ 'emails.address': newUser.email })) {
      throw new Meteor.Error('validation-error', 'Email already exists.');
    }
    if (newUser.password != newUser.passwordConfirmation) {
      throw new Meteor.Error('validation-error', 'Password and password confirmation don\'t match.');
    }
    if (newUser.roles != 'admin' && newUser.roles != 'user') {
      throw new Meteor.Error('validation-error', 'Unknown role.');
    }
    Meteor.call('addUser', newUser);
  }
});

export const editProfile = new ValidatedMethod({
  name: 'Users.methods.editProfile',
  validate: new SimpleSchema({
    username: { type: String, min: 5 },
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    password: { type: String, optional: true},
    passwordConfirmation: { type: String, optional: true}
  }).validator(),
  run(user) {
    let usernameExists = Meteor.users.findOne({ 'username': user.username });
    let emailExists = Meteor.users.findOne({ 'emails.address': user.email });

    if (usernameExists && usernameExists.username != Meteor.user().username) {
      throw new Meteor.Error('validation-error', 'Username already exists.');
    }
    
    if (emailExists && emailExists._id != Meteor.userId()) {
      throw new Meteor.Error('validation-error', 'Email already exists.');
    }
    if (user.password.length > 0){
      if (user.password.length < 6) {
        throw new Meteor.Error('validation-error', 'Password must be at least 6 characters.');
      }
      if (user.password != user.passwordConfirmation) {
        throw new Meteor.Error('validation-error', 'Password and password confirmation don\'t match.');
      }
    } else {
      delete user.password;
    }
    delete user.passwordConfirmation;  
    Meteor.call('editProfile', Meteor.userId(), user);
  }
});
