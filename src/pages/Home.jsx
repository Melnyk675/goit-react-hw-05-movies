import { useEffect, useState } from 'react';
import { fetchTrendMovies } from '../services/api';
import MovieList from '../components/MovieList/MovieList'; 
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots'; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const { results } = await fetchTrendMovies();
        setMovies(results); 
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <p>
          Sorry, we could not fetch the trending movies. Please try again later.
        </p>
      ) : (
        <MovieList movies={movies} title="Trending Today"/>
      )}
    </>
  );
};

export default Home;