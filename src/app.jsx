import React from 'react';
import Task from './components/task.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskId: 0
    };
  }

  onTaskFormSubmit(e) {
    e.preventDefault();
    var input = this.refs.taskDescInput;
    var desc = input.getDOMNode().value;
    if (!desc || desc === '') return;

    this.setState({taskId: this.state.taskId + 1});
    this.setState({
      tasks: this.state.tasks.concat({id: this.state.taskId, description: desc})
    });

    input.getDOMNode().value = '';
  }

  onTaskDelete(id) {
    this.setState({
      tasks: this.state.tasks.filter((task) => {
        return task.id !== id;
      })
    });
  }

  onTaskCompleted(id) {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.id !== id) return task;
        task.completed = !task.completed;
        return task;
      })
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map((task) => {
            return <Task
              key={task.id}
              task={task}
              onDelete={this.onTaskDelete.bind(this)}
              onCompleted={this.onTaskCompleted.bind(this)}/>;
          })}
        </ul>

        <form onSubmit={this.onTaskFormSubmit.bind(this)}>
          <input ref="taskDescInput" type="text" name="task" />
        </form>
      </div>
    );
  }
}

// app クラスを描画
React.render(
  <App />,
  document.getElementById('container')
);
