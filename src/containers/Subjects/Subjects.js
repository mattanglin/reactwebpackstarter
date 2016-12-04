import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadButton } from 'components';
import * as subjectActions from 'redux/modules/subject';

@connect(
  state => ({
    items: state.subject.items,
    isLoading: state.subject.isLoading,
    loadError: state.subject.loadError
  }),
  dispatch => bindActionCreators(subjectActions, dispatch)
)

export default class Subjects extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadError: PropTypes.any.isRequired,
    loadSubjects: PropTypes.func.isRequired
  }

  onClickHandler = (event) => {
    this.props.loadSubjects(event.target.value);
  }

  render() {
    const { items, isLoading, loadError } = this.props;
    return (
      <div>
        <LoadButton
          load={this.onClickHandler}
          isLoading={isLoading}
          isDisabled={isLoading}
          className={`btn btn-lg ${(!loadError ? 'btn-success' : 'btn-danger')}`}>
          <i className={`fa ${(isLoading ? 'fa-spinner fa-spin' : 'fa-search')}`} />
        </LoadButton> {'<- Get Default Subjects'}
        <h1># of Subjects: {items.length}</h1>
        <button
          onClick={this.onClickHandler}
          value="?age=40"
          className="btn btn-lg btn-primary">
          <i className={`fa ${(isLoading ? 'fa-spinner fa-spin' : 'fa-search')}`} />
        </button> {'<- Get All 40 Year Old Subjects'}
      </div>
    );
  }
}
