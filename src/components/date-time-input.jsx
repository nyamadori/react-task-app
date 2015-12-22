import React from 'react';
import moment from 'moment';

export default class DateTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: moment()
    }
  }

  onInputChanged(e) {
    var name = e.target.getAttribute('name');

    this.setState({
      dateTime: this.state.dateTime[name](parseInt(e.target.value))
    });
  }

  onInputKeyDown(e) {
    var min = e.target.getAttribute('min');
    var max = e.target.getAttribute('max');
    var name = e.target.getAttribute('name');
    var current = this.state.dateTime[name]();
    var v = 0;

    if (e.key == 'ArrowUp') {
      v = 1;
    } else if (e.key == 'ArrowDown') {
      v = -1;
    }

    this.setState({
      dateTime: this.state.dateTime[name](current + v)
    });
  }

  render() {
    return (
      <span className="date-time-input">
        <span className="date">
          <input className="input-years" min="0"
            onChange={this.onInputChanged.bind(this)}
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputYears"
            value={this.state.dateTime.year()}
            name="year" />
          <span className="divider">/</span>
          <input className="input-months" min="1" max="12"
            onChange={this.onInputChanged.bind(this)}
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputMonths"
            value={this.state.dateTime.month() + 1}
            name="month" />
          <span className="divider">/</span>
          <input className="input-days" min="1"
            onChange={this.onInputChanged.bind(this)}
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputDays"
            value={this.state.dateTime.date()}
            name="date" />
        </span>
        <span className="time">
          <input className="input-hours" min="0" max="23"
            onChange={this.onInputChanged.bind(this)}
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputHours"
            value={this.state.dateTime.hour()}
            name="hour" />
          <span className="divider">:</span>
          <input className="input-minutes" min="0" max="59"
            onChange={this.onInputChanged.bind(this)}
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputMinutes"
            value={this.state.dateTime.minute()}
            name="minute" />
        </span>
      </span>
    );
  }
}
