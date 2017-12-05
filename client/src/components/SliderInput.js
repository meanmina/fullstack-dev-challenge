import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SliderInput.css'

export default class SliderInput extends Component {
	render() {
		return (
			<div className="fmz-slider">
				<p>{this.props.valueLabel}</p>
				<input type="range"
					id={this.props.name}
					value={this.props.value}
					min={this.props.min}
					max={this.props.max}
					step={this.props.step}
					onChange={this.props.onChange}/>
			</div>
		)
	}
}

SliderInput.propTypes = {
	defaultValue: PropTypes.number
}
