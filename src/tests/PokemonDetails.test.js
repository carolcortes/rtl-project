import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testes do componente PokemonDetails.js', () => {
  it('As informações detalhadas do pokemon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name, type, averageWeight, summary } = pokemons[0];

    history.push(`/pokemons/${id}`);

    const pokemonTitle = screen.getByRole('heading', { name: `${name} Details` });
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const detailsSummary = screen.getByRole('heading', { name: /Summary/i });
    const pokemonInfo = screen.getByText(summary);

    expect(pokemonTitle).toBeDefined();
    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(detailsSummary).toBeDefined();
    expect(pokemonInfo).toBeDefined();
  });

  it('Na página, há uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name, foundAt } = pokemons[1];

    history.push(`/pokemons/${id}`);

    const mapTitle = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(mapTitle).toBeDefined();

    const mapImg = screen.getAllByRole('img', { name: /location/i });
    mapImg.forEach((img, index) => {
      expect(img.src).toBe(foundAt[index].map);
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name } = pokemons[2];

    history.push(`/pokemons/${id}`);
    const favPokemon = screen.getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    userEvent.click(favPokemon);
    const starIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(starIcon).toBeDefined();
  });
});
