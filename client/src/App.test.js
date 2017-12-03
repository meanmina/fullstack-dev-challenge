import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = { defaultValue: 0, name: "deposit-input", value: 0};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('financial-inputs div is set', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  const financialInputs = div.getElementsByClassName('financial-inputs')[0];
  expect(financialInputs).toBeTruthy();
});

it('renders with correct state', () => {
  const app = shallow(<App />).instance();

  expect(app.state).toBeTruthy();
  expect(app.state.deposit).toEqual(0);
  expect(app.state.monthlySavings).toEqual(0);
  expect(app.state.interest).toEqual(4);
});

it('updateDeposit updates deposit value', () => {
  const app = shallow(<App />).instance();

  var new_value = 10;
  app.updateDeposit({target: {value: new_value}});

  expect(app.state.deposit).toEqual(new_value);
});

it('updateMonthlySavings updates monthlySavings value', () => {
  const app = shallow(<App />).instance();

  var new_value = 10;
  app.updateMonthlySavings({target: {value: new_value}});

  expect(app.state.monthlySavings).toEqual(new_value);
});

it('updateInterest updates interest value', () => {
  const app = shallow(<App />).instance();

  var new_value = 10;
  app.updateInterest({target: {value: new_value}});

  expect(app.state.interest).toEqual(new_value);
});

it('updateFrequency updates interestFrequency value', () => {
  const app = shallow(<App />).instance();

  var new_value = 2;
  app.updateFrequency({target: {value: new_value}});

  expect(app.state.interestFrequency.value).toEqual(new_value);
  expect(app.state.interestFrequency.name).toEqual("Quarterly");
  expect(app.state.interestFrequency.numMonths).toEqual(3);
});

it('setNumMonths updates number of months', () => {
  const app = shallow(<App />).instance();

  var new_value = 10;
  app.setNumMonths(new_value);

  expect(app.months).toEqual(new_value);
});

it('renders correct savings', () => {
  const app = shallow(<App />).instance();
  // set deposit to 10
  app.updateDeposit({target: {value: 10}});
  // leave monthlySavings at 0
  // set interest to 1
  app.updateInterest({target: {value: 1}});
  // set numMonths to 3
  app.setNumMonths(3)

  app.render()
  expect(app.savings).toBeTruthy()
  expect(app.savings.length).toEqual(3)

  var total = app.state.deposit + app.state.monthlySavings
  var interestRate = parseFloat((app.state.interest/100)/12)
  var totalInterest = total * interestRate
  var expectedSaving = total + totalInterest
  expect(app.savings[0].month).toEqual(1)
  expect(app.savings[0].amount).toEqual(parseFloat(expectedSaving).toFixed(4))
});

it('renders correct savings with Quarterly interest', () => {
  const app = shallow(<App />).instance();
  // set deposit to 10
  app.updateDeposit({target: {value: 10}});
  // leave monthlySavings at 0
  // set interest to 1
  app.updateInterest({target: {value: 1}});
  // set interestFrequency to Quarterly
  app.updateFrequency({target: {value: 2}});
  // set numMonths to 3
  app.setNumMonths(3)

  app.render()
  expect(app.savings).toBeTruthy()
  expect(app.savings.length).toEqual(3)

  // 1st month should not have gained any interest
  var total = app.state.deposit + app.state.monthlySavings
  var expectedSaving = total + 0 // no interest
  expect(app.savings[0].month).toEqual(1)
  expect(app.savings[0].amount).toEqual(parseFloat(expectedSaving).toFixed(4))

  // 3rd month should include interest in earnings
  var interestRate = parseFloat((app.state.interest/100)/12)
  var totalInterest = total * interestRate * 3
  expectedSaving = total + totalInterest
  expect(app.savings[2].month).toEqual(3)
  expect(app.savings[2].amount).toEqual(parseFloat(expectedSaving).toFixed(4))
});
