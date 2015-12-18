import React from 'react';
import Task from './components/task.jsx';
import './styles/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {id: 1, description: 'Buy an apple', completed: true},
        {id: 2, description: 'Buy a fish'}
      ],
      taskId: 3
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
        <div className="tasks">
          {this.state.tasks.map((task) => {
            return <Task
              key={task.id}
              task={task}
              onDelete={this.onTaskDelete.bind(this)}
              onCompleted={this.onTaskCompleted.bind(this)}/>;
          })}
        </div>

        <form className="tasks-form" onSubmit={this.onTaskFormSubmit.bind(this)}>
          <div className="input-group">
            <i className="icon icon-plus"></i>
            <input id="tasks-description" className="tasks-form-description" ref="taskDescInput" type="text" name="task" autoComplete="off" />
          </div>
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
