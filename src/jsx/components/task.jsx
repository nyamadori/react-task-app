import React from 'react';

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
    if (this.props.task.completed) {
      return (
        <li>
          <s>{this.props.task.description}</s>
          <a href="#" onClick={this.onRemoveBtnClick.bind(this)}>削除</a>
          <a href="#" onClick={this.onCompleteBtnClick.bind(this)}>未完了</a>
        </li>
      );
    } else {
      return (
        <li>
          {this.props.task.description}
          <a href="#" onClick={this.onRemoveBtnClick.bind(this)}>削除</a>
          <a href="#" onClick={this.onCompleteBtnClick.bind(this)}>完了</a>
        </li>
      );
    }
  }
}
