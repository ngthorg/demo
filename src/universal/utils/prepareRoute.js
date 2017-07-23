import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function prepareRoute(prepareFn) {
  return DecoratedComponent =>
    class PrepareRouteDecorator extends Component {
      static prepareRoute = prepareFn;

      static propTypes = {
        location: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired,
      };

      static contextTypes = {
        store: PropTypes.object.isRequired,
      };

      componentDidMount() {
        const { context: { store }, props: { params, location } } = this;

        prepareFn({ store, params, location });
      }

      render() {
        return <DecoratedComponent {...this.props} />;
      }
    };
}
