import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import SliderInput from './components/SliderInput';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = { name: "slider-input", value: 0};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SliderInput {...defaultProps} />, div);
});

it('renders with defined props', () => {
  const deposit = shallow(<SliderInput {...defaultProps} />).instance();
  expect(deposit.props.name).toEqual("slider-input");
  expect(deposit.props.value).toEqual(0);
});
