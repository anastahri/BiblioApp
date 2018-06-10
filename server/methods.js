import { Books } from '../api/books/books.js'

Meteor.methods({
  toggleAdmin(id) {
    if(Roles.userIsInRole(id, 'admin'))
      Roles.removeUsersFromRoles(id, 'admin');
    else
      Roles.addUsersToRoles(id, 'admin');
  },
  removeUser(id){
    Meteor.users.remove(id);
  },
  addUser(user){
    var newUser = Accounts.createUser(user);
    Roles.addUsersToRoles(newUser, user.roles);
  },
  addBook(book){
    book.createdAt = new Date();
    Books.insert(book);
  },
  removeBook(bookId){
    Books.remove(bookId);
  },
  editProfile(userId, user){
    Meteor.users.update({_id: userId}, {
      $set: {
        username: user.username,
        emails: [
          {
            address: user.email,
            verified: false
          }
        ]
      }
    });
    if(user.password)
      Accounts.setPassword(userId, user.password, {logout: false});
  },
});