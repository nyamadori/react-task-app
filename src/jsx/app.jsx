// React をロード
var React = require('react');
// 外部ファイルへ分割した Message クラスをロード
var Task = require('./components/task.jsx');

// このアプリケーションのメインとなる App クラス
var App = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      taskId: 0
    };
  },

  onTaskFormSubmit: function(e) {
    e.preventDefault();

    var desc = this.refs.taskDescInput.getDOMNode().value;
    if (!desc || desc === '') return;

    this.setState({taskId: this.state.taskId + 1});
    this.setState({
      tasks: this.state.tasks.concat({key: this.state.taskId, description: desc})
    });

    this.refs.taskDescInput.getDOMNode().value = '';
  },

  onTaskDelete: function (key) {
    this.setState({
      tasks: this.state.tasks.filter((task) => {
        return task.key !== key;
      })
    });
  },

  onTaskCompleted: function (key) {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.key !== key) return task;
        task.completed = !task.completed;
        return task;
      })
    });
  },

  render: function() {
    return (
      <div>
        <ul>
          {this.state.tasks.map((task) => {
            return <Task task={task}
              onDelete={this.onTaskDelete}
              onCompleted={this.onTaskCompleted}/>;
          })}
        </ul>

        <form onSubmit={this.onTaskFormSubmit}>
          <input ref="taskDescInput" type="text" name="task" />
        </form>
      </div>
    );
  }
});

// app クラスを描画
React.render(
  <App />,
  document.getElementById('container')
);
