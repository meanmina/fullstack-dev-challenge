import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CurrencyInput.css'

export default class CurrencyInput extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasFocus: false
		}
	}

	handleFocus(e) {
		this.setState({
			hasFocus: true
		})
	}

	render() {
		const { defaultValue } = this.props.defaultValue

		return (
			<div className={`currency-input ${defaultValue !== undefined ? 'default-value' : ''}`}>
				<span>£</span>
				<input type="number"
					id={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange}
					onFocus={this.handleFocus.bind(this)}/>
			</div>
		)
	}
}

CurrencyInput.propTypes = {
	defaultValue: PropTypes.number
}
