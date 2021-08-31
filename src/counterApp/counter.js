import React, { Component } from "react";

class Counter extends Component {
  // constructor(){
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this)
  // }

  getDisplayedcount = () => {
    const { value } = this.props.counter;
    return value === 0 ? "zero" : value;
  };

  getClassOfCount = () => {
    const { value } = this.props.counter;
    const classes = "me-2 badge bg-";

    const newClass = value === 0 ? "warning" : "primary";
    return classes + newClass;
  };

  render() {
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getClassOfCount()}>
            {this.getDisplayedcount()}
          </span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? true : false}
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm m-2"
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
