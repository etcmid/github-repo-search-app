import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

jest.mock('./services/GitHubSearchService', () => {
  return {
    GitHubSearchService: jest.fn().mockImplementation(() => {
      return {
        searchRepos: async (query: string, page: number) => {
          if (query === 'test-repo') {
            return {
              items: [
                {
                  id: 1,
                  name: 'Test Repository 1',
                  html_url: 'https://github.com/test/test-repo1',
                  description: 'Test description 1',
                },
                {
                  id: 2,
                  name: 'Test Repository 2',
                  html_url: 'https://github.com/test/test-repo2',
                  description: 'Test description 2',
                },
              ],
              total_count: 20,
            };
          }
          return { items: [], total_count: 0 };
        },
      };
    }),
  };
});

describe('App', () => {
  it('renders the search input', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search for repositories...')).toBeInTheDocument();
  });

  it('displays search results', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Search for repositories...'), {
      target: { value: 'test-repo' },
    });

    await waitFor(() => screen.getByText('Test Repository 1'), { timeout: 3000 });
    expect(screen.getByText('Test Repository 1')).toBeInTheDocument();
    expect(screen.getByText('Test Repository 2')).toBeInTheDocument();
  });
});
