import axios from 'axios';
import Movies from '../src/services/Movies';

jest.mock('axios');

const fakeResponse = {
  results: [
    {
      vote_average: 10,
    },
    {
      vote_average: 9,
    },
    {
      vote_average: 8,
    },
    {
      vote_average: 7.5,
    },
    {
      vote_average: 7,
    },
    {
      vote_average: 6,
    },
  ],
};

const filter = {
  min_average: 7.5,
};

describe('testando consulta', () => {
  beforeAll(() => {
    axios.get.mockResolvedValue(fakeResponse);
  });

  test('consulta sem filtro trás resultados esperados', () => {
    const expected_result_length = fakeResponse.results.length;

    return Movies.getTrending().then(results =>
      expect(results.length).toBe(expected_result_length),
    );
  });

  test('número de resultados usando filtro está correto', () => {
    const expected_result_length = 4;

    return Movies.getTrending(filter).then(results =>
      expect(results.length).toBe(expected_result_length),
    );
  });

  test('todos filmes tem nota maior ou igual a nota mínima do filtro', async () => {
    let has_some_movie_with_lesser_average = false;

    const movies = await Movies.getTrending(filter);

    movies.forEach(movie => {
      if (movie.vote_average < filter.min_average) {
        has_some_movie_with_lesser_average = true;
      }
    });

    expect(has_some_movie_with_lesser_average).toBe(false);
  });
});
