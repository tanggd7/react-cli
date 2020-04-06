import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

class Loading extends Component {
  render() {
    const { error } = this.props;
    if (error) {
      return <div>错误!</div>;
    }
    return null;
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool,
  error: PropTypes.bool,
};

const DynamicModule = (options) =>
  Loadable({
    loading: Loading,
    delay: 1000,
    ...options,
  });

export default DynamicModule;
