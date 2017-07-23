/**
 * @flow
 */
import React from 'react';
import { shallow } from 'enzyme';

function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
    </div>
  );
}

function setup() {
  const wrapper = shallow(<Fixture />);

  return {
    wrapper,
  };
}

describe('demo', () => {
  it('renders demo', () => {
    expect(<div />).toEqualJSX(<div />);
    expect(3).toEqual(3);
  });

  it('renders demo #2', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.foo')).toHaveClassName('foo');
    expect(wrapper.find('.bar')).toHaveClassName('bar baz');
  });
});
