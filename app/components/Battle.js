import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @todo Look into using public class fields, instead of the constructor function
 * @see https://github.com/tc39/proposal-class-fields
 */

function PlayerPreview(props) {
	return (
		<div>
			<div className="column">
				<img
					alt={`Avatar for ${props.username}`}
					className="Avatar"
					src={props.avatar}
				/>
				<h2 className="username">
					@{props.username}
				</h2>
				<button
					className="reset"
					onClick={props.onReset.bind(null, props.id)}
				>
					Reset
				</button>
			</div>
		</div>
	)
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
}

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

		this.handleReset = this.handleReset.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(() => {
			const newState = {};

			newState[`${id}Name`] = username;
			newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
			return newState;
		})
	}

	handleReset(id) {
		this.setState(() => {
			const newState = {};

			newState[`${id}Name`] = '';
			newState[`${id}Image`] = null;
			return newState;
		})
	}

	render() {
		const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
		const { match } = this.props;
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
						playerOneImage !== null &&
						<PlayerPreview
							avatar={playerOneImage}
							id="playerOne"
							onReset={this.handleReset}
							username={playerOneName}
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

					{
						playerTwoImage !== null &&
						<PlayerPreview
							avatar={playerTwoImage}
							id="playerTwo"
							onReset={this.handleReset}
							username={playerTwoName}
						/>
					}
				</div>
				{
					playerOneImage && playerTwoImage &&
					<Link
						className="button"
						to={{
							pathname: `${match.url}/results`,
							search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
						}}
					>
						Battle
					</Link>
				}
			</div>
		)
	}
}

export default Battle;