import React, { Component } from 'react';
import CurrencyInput from './components/CurrencyInput'
import SliderInput from './components/SliderInput'
import DisplayGraph from './components/DisplayGraph'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.months = 10//50*12
    this.savings = []
    this.state = {
              deposit: 0,
              monthlySavings: 0,
              interest: 4
            }
  }

  setNumMonths(months) {
    this.months = months
  }

  updateDeposit({ target }) {
    var deposit = target.value
    const state = Object.assign({}, this.state, {deposit: parseFloat(deposit)})
    this.setState(state)
  }

  updateMonthlySavings({ target }) {
    var monthlySavings = target.value
    const state = Object.assign({}, this.state, {monthlySavings: parseFloat(monthlySavings)})
    this.setState(state)
  }

  updateInterest({ target }) {
    var interest = target.value
    const state = Object.assign({}, this.state, {interest: parseFloat(interest)})
    this.setState(state)
  }

  render() {
    this.savings = []
    // total saved
    var savedAmount = this.state.deposit
    var monthlyInterestRate = parseFloat((this.state.interest/100)/12)
    for (var i = 1; i <= this.months; i++) {
      // add the monthly savings
      if (this.state.monthlySavings > 0)
        savedAmount = savedAmount + this.state.monthlySavings
      // add the monthy interest
      var monthlyInterest = savedAmount * monthlyInterestRate
      savedAmount = savedAmount + monthlyInterest
      var earnings = parseFloat(savedAmount).toFixed(4)
      this.savings.push({month: i, amount: earnings})
    }

    return (
      <div className="App">
        <div className="header-banner">
          <h1 className="fmz-white-font">Finimize Interest Rate Calculator</h1>
        </div>
				<div className="financial-inputs">
					<p className="input-label">How much have you saved?</p>
					<CurrencyInput defaultValue={0} name="deposit-input" value={this.state.deposit} onChange={this.updateDeposit.bind(this)}/>

					<p className="input-label">How much will you save each month?</p>
					<CurrencyInput defaultValue={0} name="monthlySavings-input" value={this.state.monthlySavings} onChange={this.updateMonthlySavings.bind(this)}/>

					<p className="input-label">How much interest will you earn per year?</p>
					<SliderInput defaultValue={4} name="interest-input" value={this.state.interest} onChange={this.updateInterest.bind(this)}/>
				</div>
				<div className="financial-display">
					{/*We have included some sample data here, you will need to replace this
					with your own. Feel free to change the data structure if you wish.*/}
					<DisplayGraph data={this.savings}/>
				</div>
      </div>
    );
  }
}

export default App;
