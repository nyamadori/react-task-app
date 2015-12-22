import React from 'react';
import Calendar from 'rc-calendar';
import classNames from 'classnames';
import DateTimeInput from './date-time-input';

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

  onSetRemindTimeClick(e) {
    e.preventDefault();
    this.props.onSetRemindTime(this.props.task.id);

    var calendar = this.refs.calendar.getDOMNode();
    calendar.style.display = 'block';
  }

  render() {
    var task = this.props.task;
    var liClass = classNames({
      'tasks-item': true,
      'completed': task.completed
    });

    return (
      <div className={liClass}>
        <a href="#" className="checkbox tasks-item-check"
           onClick={this.onCompleteBtnClick.bind(this)}>
          <span className="checkbox-border">
            <i className="icon icon-check" style={!task.completed ? {display: 'none'} : {}}></i>
          </span>
        </a>
        <div className="tasks-item-description">
          {task.description} {task.remindTime.calendar()}
        </div>

        <div className="tasks-item-nav">
          <a className="tasks-item-remind-time" href="#"
             onClick={this.onSetRemindTimeClick.bind(this)}>
            <i className="icon icon-calendar"></i>
            <DateTimeInput />
          </a>
          <a className="tasks-item-remove" href="#"
             onClick={this.onRemoveBtnClick.bind(this)}>
            <i className="icon icon-times"></i>
          </a>
        </div>
      </div>
    );
  }
}
