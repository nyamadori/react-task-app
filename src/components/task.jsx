import React from 'react';
import classNames from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  onRemoveBtnClick(e) {
    e.preventDefault();
    this.props.onDelete(this.props.task.id);
  }

  onCompleteBtnClick(e) {
    e.preventDefault();
    this.props.onCompleted(this.props.task.id);
  }

  render() {
    var task = this.props.task;
    var liClass = classNames({
      'tasks-item': true,
      'completed': task.completed
    });

    return (
      <div className={liClass}>
        <a href="#" className="checkbox tasks-item-check" onClick={this.onCompleteBtnClick.bind(this)}>
          <span className="checkbox-border">
            <i className="icon icon-check" style={!task.completed ? {display: 'none'} : {}}></i>
          </span>
        </a>
        <div className="tasks-item-description">
          {task.description}
        </div>

        <div className="tasks-item-nav">
          <a className="tasks-item-remove" href="#" onClick={this.onRemoveBtnClick.bind(this)}>
            <i className="icon icon-times"></i>
          </a>
        </div>
      </div>
    );
  }
}
