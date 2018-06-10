import { Books } from '../api/books/books.js'

Meteor.publish('allUsers', function() {
  return Meteor.users.find({});	
});

Meteor.publish('allBooks', function() {
  return Books.find();
});
