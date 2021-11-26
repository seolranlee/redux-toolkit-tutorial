import React, { useEffect, useState } from 'react';
import { useGetComicByPageQuery } from './services/comic';

export default function App() {
  const [page, setPage] = useState(1);
  const [comics, setComics] = useState([]);
  const { data, error, isLoading } = useGetComicByPageQuery(page);

  useEffect(() => {
    if (data) setComics(comics.concat(data.data));
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!comics) return <div>Missing comic!</div>;

  // Using a query hook automatically fetches data and returns query values
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state
  return (
    <div className="App">
      <>
        {comics.map((comic, idx) => (
          <div>
            {idx} {comic.title}
          </div>
        ))}
        <button onClick={() => setPage(page + 1)}>page + 1</button>
      </>
    </div>
  );
}
