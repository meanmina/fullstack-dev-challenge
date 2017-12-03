import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SliderInput.css'

export default class SliderInput extends Component {
	render() {
		return (
			<div className="fmz-slider">
				<p>{this.props.value}%</p>
				<input type="range"
					id={this.props.name}
					value={this.props.value}
					min={0}
					max={10}
					step={0.25}
					onChange={this.props.onChange}/>
			</div>
		)
	}
}

SliderInput.propTypes = {
	defaultValue: PropTypes.number
}
