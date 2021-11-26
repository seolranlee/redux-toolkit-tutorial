import React, { useEffect } from 'react';
import { useGetTodoByNameQuery } from './services/todo';
export default function App() {
  const { data, error, isLoading } = useGetTodoByNameQuery('1');

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Missing todo!</div>;
  // Using a query hook automatically fetches data and returns query values
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state
  return (
    <div className="App">
      <h1>TODO list</h1>
      <p>{data.userId}</p>
      <p>{data.id}</p>
      <p>{data.title}</p>
      <p>{data.completed ? '완료' : '미완료'}</p>
    </div>
  );
}
