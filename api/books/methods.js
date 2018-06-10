import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const addBook = new ValidatedMethod({
  name: 'Books.methods.addBook',
  validate: new SimpleSchema({
    title: { type: String, min: 3 },
    author: { type: String, min: 3 },
    description: { type: String, min: 6 },
    quantity: { type: Number }
  }).validator(),
  run(newBook) {
    // if (_some_error_) { //can't think of any right now
    //   throw new Meteor.Error('validation-error', '_some_error_');
    // }
    Meteor.call('addBook', newBook);
  }
});