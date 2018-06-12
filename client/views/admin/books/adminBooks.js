import { ReactiveDict } from 'meteor/reactive-dict';
import { addBook } from '../../../../api/books/methods.js';
import moment from 'moment';

import { Books } from '../../../../api/books/books.js';

var toInt = function (stringVal){
	return parseInt(stringVal, 10);
}

Template.adminBooks.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allBooks');
	});
  this.boxBodyCollapsed = new ReactiveDict({'show': false});
  this.error = new ReactiveDict();
  this.success = new ReactiveDict();
});

Template.adminBooks.helpers({
	books: function() {
		return Books.find({}, { sort: { createdAt: -1 } });
	},
	momentCreatedAt: function() {
		return moment(this.createdAt).format('MMMM D YYYY HH:mm');
	},
	showError: function() {
    return Template.instance().error.get('message');
  },
  showSuccess: function() {
    return Template.instance().success.get('message');
  }
});

Template.adminBooks.events({
	'click .addBookBoxHeader': function() {
		let toggleSign = document.getElementById("toggle-sign");
		let boxBody = document.getElementById("boxBody");
		
		if(Template.instance().boxBodyCollapsed.get('show')) {

			Template.instance().boxBodyCollapsed.set({'show': false})
			toggleSign.classList.remove("fa-minus");
			toggleSign.classList.add("fa-plus");
			boxBody.classList.add("hide");
		
		} else {
			
			Template.instance().boxBodyCollapsed.set({'show': true})
			toggleSign.classList.remove("fa-plus");
			toggleSign.classList.add("fa-minus");
			boxBody.classList.remove("hide");
		}
	},

	'submit .addBook'(event, instance) {
    event.preventDefault();
    instance.error.set({'message': false});
    instance.success.set({'message': false});
    const data = {
      title: event.target.title.value,
      author: event.target.author.value,
      description: event.target.description.value,
      quantity: toInt(event.target.quantity.value)
    };
    addBook.call(data, (err, res) => {
      if (err) {
        if (err.error === 'validation-error') {
          instance.error.set({'message': err.reason});
        }
      } else {
        instance.success.set({'message': "Book added."});
      }
    });
  },

  'click .deleteBook': function() {
  	Meteor.call('removeBook', this._id);
  }
});