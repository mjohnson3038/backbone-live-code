// Need to add any libraries used in this view:
// Note, $el is a backbone thing not a jQuery
import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.task = options.task;
    this.template = options.template;
  },

  render: function() {
    var html = this.template({task: this.task});
    // Template avoids text heavy in html

    // html += '<h2>' + this.task.title + '</h2>';
    // html += '<p>' + this.task.description + '</p>';
    // html += '</li>';
    this.$el.html(html);

    // Enable chained calls. This is something you can do, you don't need to do. This is a good habit to get into especially because it doesn't block anything.
    return this;
  }
});

// Makes something availible from the file for another file
export default TaskView;
