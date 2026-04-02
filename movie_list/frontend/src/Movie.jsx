export default function Movie({
  m,
  watched,
  setWatched,
  unwatched,
  setUnwatched,
}) {
  const { title } = m;

  const handleDeleteMovie = async () => {
    const res = await fetch(`http://localhost:8080/movies/${m.id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data;
  };

  const handleToggle = () => {
    let newWatched = watched;
    let newUnwatched = unwatched;

    if (watched.some(movie => movie.id === m.id)) {
      newWatched = watched.filter(movie => movie.id !== m.id);
      localStorage.setItem('watched', JSON.stringify(newWatched));
      setWatched(newWatched);

      newUnwatched.push(m);
      localStorage.setItem('unwatched', JSON.stringify(newUnwatched));
      setUnwatched(newUnwatched);

      return;
    }

    newWatched.push(m);
    localStorage.setItem('watched', JSON.stringify(newWatched));
    setWatched(newWatched);

    newUnwatched = unwatched.filter(movie => movie.id !== m.id);
    localStorage.setItem('unwatched', JSON.stringify(newUnwatched));
    setUnwatched(newUnwatched);
  };

  if (!m) return <h1>Loading...</h1>;

  return (
    <>
      {
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h2>{title}</h2>
          <div onClick={handleDeleteMovie} style={{ cursor: 'pointer' }}>
            X
          </div>
          <input
            type="checkbox"
            onClick={handleToggle}
            checked={watched.some(movie => movie.id === m.id)}
          ></input>
        </div>
      }
    </>
  );
}
