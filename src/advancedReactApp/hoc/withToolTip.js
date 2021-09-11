import React, { Component } from "react";

const withToolTip = (Component) => {
  return class withToolTip extends React.Component {
    state = {
      showToolTip: false,
    };
    handleMouseOver = () => {
      this.setState({ showToolTip: true });
    };
    handleMouseOut = () => {
      this.setState({ showToolTip: false });
    };
    render() {
      return (
        <div
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <Component {...this.props} showToolTip={this.state.showToolTip} />
        </div>
      );
    }
  };
};

export default withToolTip;
