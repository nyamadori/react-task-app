var React = require('react');

var Task = React.createClass({
  onRemoveBtnClick: function (e) {
    e.preventDefault();
    this.props.onDelete(this.props.task.key);
  },

  onCompleteBtnClick: function (e) {
    e.preventDefault();
    this.props.onCompleted(this.props.task.key);
  },

  render: function() {
    if (this.props.task.completed) {
      return (
        <li>
          <s>{this.props.task.description}</s>
          <a href="#" onClick={this.onRemoveBtnClick}>削除</a>
          <a href="#" onClick={this.onCompleteBtnClick}>未完了</a>
        </li>
      );
    } else {
      return (
        <li>
          {this.props.task.description}
          <a href="#" onClick={this.onRemoveBtnClick}>削除</a>
          <a href="#" onClick={this.onCompleteBtnClick}>完了</a>
        </li>
      );
    }
  }
});

// エクスポート
module.exports = Task;
