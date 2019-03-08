import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    btnLoading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    const cachedRepos = localStorage.getItem('repositories');
    if (cachedRepos) {
      this.setState({ repositories: JSON.parse(cachedRepos) });
    }
  }

  handleAddRepository = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      localStorage.setItem('repositories', JSON.stringify([...repositories, repository]));
    } catch (error) {
      this.setState({
        repositoryError: true,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRefreshRepository = async (event, repoFullName) => {
    const { repositories } = this.state;

    this.setState({ btnLoading: true });

    try {
      const { data: refreshedRepo } = await api.get(`/repos/${repoFullName}`);
      refreshedRepo.lastCommit = moment(refreshedRepo.pushed_at).fromNow();

      const newList = repositories.map((repo) => {
        if (repo.id === refreshedRepo.id) {
          return refreshedRepo;
        }
        return repo;
      });

      this.setState({
        repositories: newList,
      });

      localStorage.setItem('repositories', JSON.stringify(newList));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ btnLoading: false });
    }
  };

  handleDeleteRepository = (event, id) => {
    const { repositories } = this.state;
    const newList = repositories.filter(repo => repo.id !== id);
    this.setState({
      repositories: newList,
    });
    localStorage.setItem('repositories', JSON.stringify(newList));
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading, btnLoading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="user/repo"
            value={repositoryInput}
            onChange={event => this.setState({ repositoryInput: event.target.value })}
          />
          <button type="submit">
            {loading ? <i className="fas fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <CompareList
          repositories={repositories}
          handleRefresh={this.handleRefreshRepository}
          handleDelete={this.handleDeleteRepository}
          btnLoading={btnLoading}
        />

        <div className="btnLoading">
          {btnLoading ? <i className="fas fa-spinner fa-pulse" /> : ''}
        </div>
      </Container>
    );
  }
}
