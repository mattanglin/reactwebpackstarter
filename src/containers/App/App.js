import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link, IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { isLoaded as subjectsLoaded, loadSubjects } from 'redux/modules/subject';
import config from '../../config';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!subjectsLoaded(getState())) {
      promises.push(dispatch(loadSubjects()));
    }

    return Promise.all(promises);
  }
}])

@connect(null, { pushState: push })

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user && nextProps.thisIsFalse) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user && nextProps.thisIsFalse) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    const styles = require('./App.scss');
    const logo = require('./logo.png');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <div className={styles.menu}>
          <ul>
            <li className="link">
              <IndexLink to="/" activeClassName="active">Home</IndexLink>
            </li>
            <li className="link">
              <Link to="/subjects" activeClassName="active">Subjects</Link>
            </li>
          </ul>
        </div>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <hr />
        <div>
          <img className={styles.logo} src={logo} />
        </div>
      </div>
    );
  }
}
