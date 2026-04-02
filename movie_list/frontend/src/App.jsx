import { useEffect, useState } from 'react';
import Movie from './Movie';

export default function App() {
  const [movies, setMovies] = useState(
    () => JSON.parse(localStorage.getItem('movies')) || [],
  );
  const [searchValue, setSearchValue] = useState('');
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [watched, setWatched] = useState(
    () => JSON.parse(localStorage.getItem('watched')) || [],
  );
  const [unwatched, setUnwatched] = useState(
    () => JSON.parse(localStorage.getItem('unwatched')) || movies,
  );

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetch('http://localhost:8080/movies');
      const movies = await data.json();

      localStorage.setItem('movies', JSON.stringify(movies));
      setMovies(movies);
    };
    getMovies();
  }, [movies]);

  const handleCreateMovie = async () => {
    try {
      const res = await fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newMovieTitle }),
      });

      const data = await res.json();

      setSubmitMessage(data.message);
    } catch (err) {
      setSubmitMessage(err.message);
    }
  };

  const handleFilterWatched = () => {
    filter !== 'watched' ? setFilter('watched') : setFilter('all');
  };

  const handleFilterUnwatched = () => {
    filter !== 'unwatched' ? setFilter('unwatched') : setFilter('all');
  };

  if (!movies.length) return <h1>Loading...</h1>;

  let filteredMovies;

  if (filter === 'watched')
    filteredMovies = watched.filter(movie =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  else if (filter === 'unwatched')
    filteredMovies = unwatched.filter(movie =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  else
    filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

  return (
    <>
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
          placeholder="Search..."
        ></input>

        <input
          type="text"
          value={newMovieTitle}
          onChange={e => {
            setNewMovieTitle(e.target.value);
          }}
          placeholder="Add new movie title..."
        ></input>

        <button onClick={handleCreateMovie} style={{ cursor: 'pointer' }}>
          Submit
        </button>

        <button onClick={handleFilterWatched} style={{ cursor: 'pointer' }}>
          {filter !== 'watched' ? 'See Watched Movies' : 'See All Movies'}
        </button>

        <button onClick={handleFilterUnwatched} style={{ cursor: 'pointer' }}>
          {filter !== 'unwatched' ? 'See Unwatched Movies' : 'See All Movies'}
        </button>

        {submitMessage ? <div>{submitMessage}</div> : ''}
      </div>

      {filteredMovies.map(m => (
        <Movie
          key={m.id}
          m={m}
          setWatched={setWatched}
          watched={watched}
          unwatched={unwatched}
          setUnwatched={setUnwatched}
        />
      ))}
    </>
  );
}
