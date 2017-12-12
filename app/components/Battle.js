import React from 'react';
import PropTypes from 'prop-types';

class PlayerInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		const value = e.target.value;

		this.setState(() => {
			return {
				username: value
			}
		})
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.onSubmit(
			this.props.id,
			this.state.username
		)
	}
	render() {
		return (
			<form className="column" onSubmit={this.handleSubmit}>
				<label htmlFor="username" className="header">
					{this.props.label}
				</label>
				<input
					autoComplete="off"
					id="username"
					onChange={this.handleChange}
					placeholder="GitHub username"
					type="text"
					value={this.state.username}
				/>
				<button
					className="button"
					disabled={!this.state.username}
					type="submit"
				>
					Submit
				</button>
			</form>
		)
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(function() {
			const newState = {};

			newState[`${id}Name`] = username;
			// newState[id + 'Image'] = 'https://github.com/' + username;
			newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
			return newState;
		})
	}

	render() {
		const { playerOneName, playerTwoName } = this.state;

		return (
			<div>
				<div className="row">
					{
						!playerOneName &&
						<PlayerInput
							id="playerOne"
							label="Player One"
							onSubmit={this.handleSubmit}
						/>
					}

					{
						!playerTwoName &&
						<PlayerInput
							id="playerTwo"
							label="Player Two"
							onSubmit={this.handleSubmit}
						/>
					}
				</div>
			</div>
		)
	}
}

export default Battle;