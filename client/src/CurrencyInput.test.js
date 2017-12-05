import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import CurrencyInput from './components/CurrencyInput';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = { defaultValue: 0, name: "deposit-input", value: 0};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrencyInput {...defaultProps} />, div);
});

it('renders with defined props', () => {
  const deposit = shallow(<CurrencyInput {...defaultProps} />).instance();
  expect(deposit.props.defaultValue).toEqual(0);
  expect(deposit.props.name).toEqual("deposit-input");
  expect(deposit.props.value).toEqual(0);
});

it('handleFocus sets focus true', () => {
  const deposit = shallow(<CurrencyInput {...defaultProps} />).instance();
  expect(deposit.state.hasFocus).toEqual(false);

  deposit.handleFocus()
  expect(deposit.state.hasFocus).toEqual(true);
});
