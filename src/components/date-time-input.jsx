import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

export default class DateTimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: moment()
    };

    this._focusIndex = 0;
  }

  componentDidMount() {
    this.inputs = Array.prototype.slice.call(ReactDOM.findDOMNode(this).querySelectorAll('input'));
    window.addEventListener('keydown', this.onWindowKeyDown.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onWindowKeyDown.bind(this), false);
  }

  get focusIndex() {
    return this._focusIndex;
  }

  set focusIndex(value) {
    this._focusIndex = value;
    this.inputs[value].focus();
  }

  focusPrev() {
    this.focusIndex = this.focusIndex == 0 ? this.inputs.length - 1 : this.focusIndex - 1
  }

  focusNext() {
    this.focusIndex = this.focusIndex == this.inputs.length - 1 ? 0 : this.focusIndex + 1;
  }

  onWindowKeyDown(e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) >= 0) e.preventDefault();
  }

  onInputKeyDown(e) {
    var name = e.target.getAttribute('name');
    var current = this.state.dateTime[name]();
    var v = 0;

    switch (e.keyCode) {
    case 38: // ArrowUp
      v = 1;
      break;
    case 40: // ArrowDown
      v = -1;
      break;
    case 37: // ArrowLeft
      this.focusPrev()
      break;
    case 39: // ArrowRight
      this.focusNext();
      break;
    }

    this.setState({
      dateTime: this.state.dateTime[name](current + v)
    });
  }

  onInputClick(e) {
    var index = this.inputs.indexOf(e.target);
    this.focusIndex = index;
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
          <input className="input-year" min="0"
            onKeyDown={this.onInputKeyDown.bind(this)}
            onClick={this.onInputClick.bind(this)}
            ref="inputYear"
            value={this.state.dateTime.year()}
            name="year"
            readOnly />
          <span className="divider">/</span>
          <input className="input-month" min="1" max="12"
            onKeyDown={this.onInputKeyDown.bind(this)}
            onClick={this.onInputClick.bind(this)}
            ref="inputMonth"
            value={this.formatNumber(this.state.dateTime.month() + 1, 2)}
            name="month"
            readOnly />
          <span className="divider">/</span>
          <input className="input-date" min="1"
            onKeyDown={this.onInputKeyDown.bind(this)}
            onClick={this.onInputClick.bind(this)}
            ref="inputDate"
            value={this.formatNumber(this.state.dateTime.date(), 2)}
            name="date"
            readOnly />
        </span>
        <span className="time">
          <input className="input-hour" min="0" max="23"
            onKeyDown={this.onInputKeyDown.bind(this)}
            onClick={this.onInputClick.bind(this)}
            ref="inputHour"
            value={this.formatNumber(this.state.dateTime.hour(), 2)}
            name="hour"
            readOnly />
          <span className="divider">:</span>
          <input className="input-minute" min="0" max="59"
            onKeyDown={this.onInputKeyDown.bind(this)}
            onClick={this.onInputClick.bind(this)}
            ref="inputMinute"
            value={this.formatNumber(this.state.dateTime.minute(), 2)}
            name="minute"
            readOnly />
        </span>
      </span>
    );
  }
}
