import React, { Component } from 'react';
import CurrencyInput from './components/CurrencyInput'
import SliderInput from './components/SliderInput'
import DisplayGraph from './components/DisplayGraph'
import serverSide from './serverSide';
import fixerApi from './fixerApi';
import './App.css';

const baseCurrency = "GBP"

class App extends Component {
  constructor(props) {
    super(props)

    this.months = 12//50*12
    this.savings = []
    this.state = {
              deposit: 0,
              monthlySavings: 0,
              interest: 4,
              interestFrequency: this.getFrequency(1),
              currency: {value: 1, label: "GBP", exchangeRate: 1}
            }
  }

  requestSavings(deposit, interest, months, monthlySavings, interestFrequency, currency) {
    this.savings = serverSide.requestPost(deposit, interest, months, monthlySavings, interestFrequency, currency).data
  }

  setNumMonths(months) {
    this.months = months
  }

  updateDeposit({ target }) {
    var deposit = parseFloat(target.value)
    const state = Object.assign({}, this.state, {deposit: deposit})
    this.requestSavings(deposit,
                        this.state.interest,
                        this.months,
                        this.state.monthlySavings,
                        this.state.interestFrequency.numMonths,
                        this.state.currency.exchangeRate)
    this.setState(state)
  }

  updateMonthlySavings({ target }) {
    var monthlySavings = parseFloat(target.value)
    const state = Object.assign({}, this.state, {monthlySavings: monthlySavings})
    this.requestSavings(this.state.deposit,
                        this.state.interest,
                        this.months,
                        monthlySavings,
                        this.state.interestFrequency.numMonths,
                        this.state.currency.exchangeRate)
    this.setState(state)
  }

  updateInterest({ target }) {
    var interest = parseFloat(target.value)
    const state = Object.assign({}, this.state, {interest: interest})
    this.requestSavings(this.state.deposit,
                        interest,
                        this.months,
                        this.state.monthlySavings,
                        this.state.interestFrequency.numMonths,
                        this.state.currency.exchangeRate)
    this.setState(state)
  }

  getFrequency(x) {

    switch(x) {
      case 1:
        return {name: "Monthly", value: 1, numMonths: 1};
      case 2:
        return {name: "Quarterly", value: 2, numMonths: 3};
      case 3:
        return {name: "Annually", value: 3, numMonths: 12};
      default:
        return {name: "Monthly", value: 1, numMonths: 1};
    }
  }

  updateFrequency({ target }) {
    var frequency = this.getFrequency(parseFloat(target.value))
    const state = Object.assign({}, this.state, {interestFrequency: frequency})
    this.requestSavings(this.state.deposit,
                        this.state.interest,
                        this.months,
                        this.state.monthlySavings,
                        frequency.numMonths,
                        this.state.currency.exchangeRate)
    this.setState(state)
  }

  updateCurrency({ target }) {
    var currency = this.getCurrency(parseFloat(target.value))
    var exchangeRate = 1
    fixerApi.requestCurrency(baseCurrency, currency.label).then(data => {
      if (data.data)
        exchangeRate = data.data
      // currency validation
      if (exchangeRate > 0) {
        const state = Object.assign({}, this.state, {currency: {value: currency.value, label: currency.label, exchangeRate: exchangeRate}})
        this.requestSavings(this.state.deposit,
                            this.state.interest,
                            this.months,
                            this.state.monthlySavings,
                            this.state.interestFrequency.numMonths,
                            exchangeRate)
        this.setState(state)
        this.render()
      }
    })
  }

  getCurrency(x) {
    switch(x) {
      case 1:
        return {value: 1, label: "GBP"};
      case 2:
        return {value: 2, label: "EUR"};
      case 3:
        return {value: 3, label: "USD"};
      default:
        return {value: 1, label: "GBP"};
    }
  }

  render() {
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
					<SliderInput defaultValue={4} name="interest-input" value={this.state.interest} valueLabel={this.state.interest.toString()+"%"} min={0} max={10} step={0.25} onChange={this.updateInterest.bind(this)}/>

          <br /><br /><br /><p className="input-label">How frequent will interest be paid?</p>
          <SliderInput defaultValue={1} name="interestFrequency-input" value={this.state.interestFrequency.value} valueLabel={this.state.interestFrequency.name} min={1} max={3} step={1} onChange={this.updateFrequency.bind(this)}/>

          <br /><br /><br /><p className="input-label">Pick currency for results:</p>
          <SliderInput defaultValue={1} name="currency-input" value={this.state.currency.value} valueLabel={this.state.currency.label} min={1} max={3} step={1} onChange={this.updateCurrency.bind(this)}/>
				</div>
				<div className="financial-display">
					<DisplayGraph data={this.savings}/>
				</div>
      </div>
    );
  }
}

export default App;
