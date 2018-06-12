Router.configure({
  layoutTemplate: 'appLayout',
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/login',
  template: 'accountsLogin',
  layoutTemplate: 'appLayout',
  redirect: '/',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signup',
  path: '/register',
  template: 'accountsRegister',
  layoutTemplate: 'appLayout',
  redirect: '/',
});

Router.route('/', {
  name: 'welcome',
  template: 'welcome'
});

Router.route('/profile', function (){
  var user = Meteor.user();
  this.render('profile', {data: user});
});

Router.route('/admin/users', {
  name: 'admin.users',
  action: function (){
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      this.render('allUsers');
    }
  }
});

Router.route('/admin/users/add', {
  name: 'admin.users.add',
  action: function (){
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      this.render('addUser');
    }
  }
});

Router.route('/admin/books', {
  name: 'admin.books',
  action: function (){
    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      this.render('adminBooks');
    }
  }
});

Router.plugin('ensureSignedIn', {
  only: ['profile', 'admin.users', 'admin.users.add', 'admin.books']
});