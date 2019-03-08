import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository, Button } from './styles';

const CompareList = ({ repositories, handleRefresh, handleDelete }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            {' '}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            {' '}
            <small>last commit</small>
          </li>
        </ul>

        <div>
          <Button
            type="submit"
            buttonStyle="refresh"
            onClick={event => handleRefresh(event, repository.full_name)}
          >
            <i className="fas fa-redo-alt" />
          </Button>
          <Button
            type="submit"
            buttonStyle="remove"
            onClick={event => handleDelete(event, repository.id)}
          >
            <i className="fas fa-trash-alt" />
          </Button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.defaultProps = {
  handleRefresh: () => {},
  handleDelete: () => {},
};

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,
  handleRefresh: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default CompareList;
