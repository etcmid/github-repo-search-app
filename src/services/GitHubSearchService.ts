import axios from 'axios';

const SEARCH_REPOS_API = 'https://api.github.com/search/repositories';

interface SearchReposResponse {
  items: any[];
  total_count: number;
}

export class GitHubSearchService {
  async searchRepos(query: string, page: number, perPage: number = 10): Promise<SearchReposResponse> {
    const response = await axios.get(SEARCH_REPOS_API, {
      params: {
        q: query,
        per_page: perPage,
        page: page,
      },
    });

    return {
      items: response.data.items,
      total_count: response.data.total_count,
    };
  }
}
