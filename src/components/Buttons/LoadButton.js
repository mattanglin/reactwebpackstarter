import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    const { load, isLoading, isDisabled, ...rest } = this.props;
    return (
      <button {...rest} onClick={!isDisabled ? load : () => null}>{isLoading ? <i className="fa fa-spin fa-spinner" /> : this.props.children}</button>
    );
  }
}
