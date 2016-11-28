import $ from 'jquery';
// import _ from 'underscore';
// import Backbone from 'backbone';

import TaskListView from 'app/views/task_list_view.js';
import TaskView from 'app/views/task_view.js';

var taskData = [
  {
    title: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon'
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer'
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???'
  }
];


// $(document).ready(function() {
//   var taskTemplate = _.template($('#task-template').html());
//   var taskListElement = $('.task-list');
//   var cardList = [];
//   taskData.forEach(function(taskDatum) {
//       var card = new TaskView({
//         task: taskDatum,
//         template: taskTemplate
//       });
//       cardList.push(card);
//       taskListElement.append(card.render().$el);
//   });
// });

$(document).ready(function() {
  var application = new TaskListView({

    // Everything in the following two lines gets put into options. Note, you do not need to initialize el: $('#application'), because backbone just knows.
    el: $('#application'),
    taskData: taskData
  });
  application.render();
});
