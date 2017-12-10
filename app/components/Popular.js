import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

function SelectedLanguage(props) {
	const languages = ['All', 'JavaScript', 'Java', 'CSS', 'Python'];
	return (
		<ul className="languages">
			{
				languages.map((lang) => {
					return (
						<li
							key={lang}
							onClick={props.onSelect.bind(null, lang)}
							style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
						>
							{lang}
						</li>
					)
				})
			}
		</ul>
	)
}
function RepoGrid(props) {
	return (
		<ul className="popular-list">
			{
				props.repos.map((repo, index) => {
					return (
						<li className="popular-item" key={repo.name}>
							<div className="popular-rank">#{index + 1}</div>
							<ul className="space-list-items">
								<li>
									<img
										alt={`Avatar for ${repo.owner.login}`}
										className="avatar"
										src={repo.owner.avatar_url}
									/>
								</li>
								<li><a href={repo.html_url}>{repo.name}</a></li>
							</ul>
						</li>
					)
				})
			}
		</ul>
	)
}

SelectedLanguage.propTypes = {
	onSelect: PropTypes.func.isRequired,
	selectedLanguage: PropTypes.string.isRequired
}

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		}
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(() => {
			return {
				selectedLanguage: lang,
				repos: null
			}
		})

		api.fetchPopularRepos(lang)
			.then((repos) => {
				console.log(repos);
				this.setState(() => {
					return {
						repos: repos
					}
				})
			})
		}

	render() {
		return (
			<div>
				<SelectedLanguage
					onSelect={this.updateLanguage}
					selectedLanguage={this.state.selectedLanguage}
				/>
				{
					!this.state.repos
						? <p>Loading</p>
						: <RepoGrid repos={this.state.repos} />
				}
			</div>
		)
	}
}

export default Popular;