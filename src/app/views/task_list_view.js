import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskView from 'app/views/task_view.js';

// TaskListView will be incharge of the whole applciation: (1) track list of tasks (2) track list of cards. It will render all tracksed cards. Will only need to compile the template once, so this is where it should go.

// ** Task View is incharge of individual tasks VS Task List View gives you the list of Task Views.
// Owns the template
var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Note, initialize doesn't have anything to do with HTML which will occur in render.
    this.taskData = options.taskData;

    // Compile a template to be shared between the individual tasks

    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    // this.$ allows us to search for a child of an element owned by this view. If you were not to include this.$ you will search the entire list which become innefficient with much larger lists.
    this.listElement = this.$('.task-list');

    // Create a TaskView for each task
    this.cardList = [];
    this.taskData.forEach(function(task) {
      var card = new TaskView({
        task: task,
        // Passing in the template that each of the tasks will be using to display the individual tasks
        template: this.taskTemplate
      });
      this.cardList.push(card);
    }, this); // bind `this` so it's available inside forEach

    // ... whatever was here before ...

    // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

  },

  render: function() {
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();

    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();

      // Add that HTML to our task list
      this.listElement.append(card.$el);
    }, this);

    return this; // enable chained calls
  },

  events: {
    'click .clear-button': 'clearInput',
    'submit .new-task': 'createTask'
  },

  clearInput: function(event) {
    this.input.title.val('');
    this.input.description.val('');
  },

  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  },


  createTask: function(event){
    // Normally a form submission will refresh the page.
    // Suppress that behavior.
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var task = this.getInput();

    // Add the new task to our list of tasks
    this.taskData.push(task);

    // Create a card for the new task, and add it to our card list
    var card = new TaskView({
      task: task,
      template: this.taskTemplate
    });
    this.cardList.push(card);

    // Re-render the whole list, now including the new card
    this.render();

    // Clear the input form so the user can add another task
    this.clearInput();
  }

});

export default TaskListView;
