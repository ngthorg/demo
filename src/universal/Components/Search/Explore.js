import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routerActions } from 'react-router-redux';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';

export default class Explore extends PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  };

  static contextTypes = {
    store: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = {
      search: props.params.name || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.params, nextProps.params)) {
      this.setState({
        search: nextProps.params.name,
      });
    }
  }

  getInputValue() {
    return this.search.value;
  }

  handleOnChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSearchClick();
    }
  }

  handleSearchClick() {
    this.handleSearch(this.getInputValue());
  }

  handleSearch(value) {
    if (value) {
      const { store } = this.context;
      store.dispatch(routerActions.push(`/search/${value}`));
    }
  }

  render() {
    return (
      <div className="input-group input-group-sm">
        <input
          ref={(element) => { this.search = element; }}
          type="text"
          autoFocus // eslint-disable-line
          placeholder="Search username github"
          className="form-control"
          value={this.state.search || ''}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleOnChange}
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSearchClick}
          >
            Search
          </button>
        </span>
      </div>
    );
  }
}
