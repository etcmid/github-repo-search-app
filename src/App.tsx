import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { RepoList } from './components/RepoList';
import { Pagination } from './components/Pagination';
import { GitHubSearchService } from './services/GitHubSearchService';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

const gitHubSearchService = new GitHubSearchService();

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchRepos = async (query: string, page: number) => {
    try {
      const response = await gitHubSearchService.searchRepos(query, page);

      setRepos(response.items);
      setTotalPages(Math.ceil(response.total_count / 10));
    } catch (error) {
      console.error(error);
    }
  };

  const throttledSearch = useCallback(debounce((query: string, page: number) => {
    searchRepos(query, page);
  }, 1500), []);

  useEffect(() => {
    if (searchTerm) {
      throttledSearch(searchTerm, page);
    } else {
      setRepos([]);
    }
  }, [searchTerm, page, throttledSearch]);

  return (
    <div className="container">
      <input
        className="form-control my-3"
        type="text"
        placeholder="Search for repositories..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />
      <RepoList repos={repos} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage: number) => setPage(newPage)}
      />
    </div>
  );
};

export default App;
