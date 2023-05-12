import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { toast } from 'react-hot-toast'; 
import { fetchMovieByName } from '../services/api';
import SearchMovies from '../components/SearchMovies/SearchMovies';
import { StyledSection } from '../components/MovieList/MovieList.styled';                              
import MovieList from '../components/MovieList/MovieList';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query') ?? '';
    if (!query) return;

    const getMovie = async () => {
      try {
        const { results } = await fetchMovieByName(query);

        if (results.length === 0) {
          toast.dismiss(); 
          toast.error('No movies found');
          setMovies([]); 
        } else {
          setMovies(results); 
        }
      } catch (error) {
        toast.error(error.message);
        setMovies([]);
      }
    };

      getMovie();
  }, [searchParams]);

  const handleSubmit = query => {
    setSearchParams({ query }); 
  };

  return (
    <main>
      <StyledSection>
      <MovieList movies={movies} title="Movies Page" />

        <SearchMovies onSubmit={handleSubmit} /> 
      </StyledSection>
    </main>
  );
};

export default Movies;