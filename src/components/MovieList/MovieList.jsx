import PropTypes from 'prop-types';
import {
  StyledSection,
  StyledLink,
  SectionTitle,
  List,
  ListItem,
} from './MovieList.styled'; 

const MovieList = ({ movies, title }) => {
  return (
    <StyledSection>
      {title && <SectionTitle>{title}</SectionTitle>}

      <List>
        {movies.map(movie => (
          <ListItem key={movie.id}>
            <StyledLink to={`/movies/${movie.id}`}>
              {movie.title}
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </StyledSection>
  );
};

export default MovieList;

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

