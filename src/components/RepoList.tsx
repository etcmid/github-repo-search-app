import React from 'react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

interface RepoListProps {
  repos: Repo[];
}

export const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <ul className="list-group">
      {repos.map((repo) => (
        <li key={repo.id} className="list-group-item">
          <h3>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </h3>
          <p>{repo.description}</p>
        </li>
      ))}
    </ul>
  );
};
