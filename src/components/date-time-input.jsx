import React from 'react';
import moment from 'moment';

export default class DateTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: moment()
    }
  }

  // onInputChanged(e) {
  //   var name = e.target.getAttribute('name');
  //
  //   this.setState({
  //     dateTime: this.state.dateTime[name](parseInt(e.target.value))
  //   });
  // }

  onInputKeyDown(e) {
    var min = e.target.getAttribute('min');
    var max = e.target.getAttribute('max');
    var name = e.target.getAttribute('name');
    var current = this.state.dateTime[name]();
    var v = 0;

    switch (e.key) {
    case 'ArrowUp':
      v = 1;
      break;
    case 'ArrowDown':
      v = -1;
      break;
    case 'ArrowLeft':

      break;
    case 'ArrowRight':

      break;
    }

    this.setState({
      dateTime: this.state.dateTime[name](current + v)
    });
  }

  formatNumber(num, width) {
    var zero = '';

    for (var i = 0; i < width; i++) {
      zero += '0';
    }

    return (zero + num).substr(-width, width);
  }

  render() {
    return (
      <span className="date-time-input">
        <span className="date">
          <input className="input-years" min="0"
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputYears"
            value={this.state.dateTime.year()}
            name="year"
            readOnly />
          <span className="divider">/</span>
          <input className="input-months" min="1" max="12"
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputMonths"
            value={this.formatNumber(this.state.dateTime.month() + 1, 2)}
            name="month"
            readOnly />
          <span className="divider">/</span>
          <input className="input-days" min="1"
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputDays"
            value={this.formatNumber(this.state.dateTime.date(), 2)}
            name="date"
            readOnly />
        </span>
        <span className="time">
          <input className="input-hours" min="0" max="23"
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputHours"
            value={this.formatNumber(this.state.dateTime.hour(), 2)}
            name="hour"
            readOnly />
          <span className="divider">:</span>
          <input className="input-minutes" min="0" max="59"
            onKeyDown={this.onInputKeyDown.bind(this)}
            ref="inputMinutes"
            value={this.formatNumber(this.state.dateTime.minute(), 2)}
            name="minute"
            readOnly />
        </span>
      </span>
    );
  }
}
