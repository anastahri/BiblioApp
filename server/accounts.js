var postSignUp = function (userId, info){
  if(Meteor.users.find().count() > 1)
  	Roles.addUsersToRoles(userId, 'user');
  else
  	Roles.addUsersToRoles(userId, 'admin');
};

AccountsTemplates.configure({
  postSignUpHook: postSignUp,
  texts: {
    title: {
      signIn: '',
      signUp: '',
    }
  },
});