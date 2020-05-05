import http from 'axios';
import {apiUrl, apiKey} from '../../api_credentials.json';

const Movies = {
  getTrending: async (filter = {}) => {
    const {data} = await http.get(
      `${apiUrl}/trending/movie/week?api_key=${apiKey}`,
    );

    if (filter.min_average) {
      return data.results.filter(
        movie => movie.vote_average >= filter.min_average,
      );
    }

    return data.results;
  },
};

export default Movies;
