import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente Pokedex.js', () => {
  const nameTestId = 'pokemon-name';

  it('A página contém um h2 com o texto \'Encountered pokémons\'', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });

    expect(pokedexTitle).toBeDefined();
  });

  it(`O próximo pokémon da lista é exibido quando o botão 'Próximo pokémon'
     é clicado`, () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeDefined();

    pokemons.forEach(({ name }) => {
      const pokemonName = screen.getByText(name);
      expect(pokemonName).toBeDefined();
      userEvent.click(nextBtn);
    });

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeDefined();
  });

  it('É mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(nameTestId);
    expect(pokemon).toHaveLength(1);
  });

  it(`A pokédex possui os botões de filtragem para cada tipo de pokémon,
   sem repetição`, () => {
    renderWithRouter(<App />);

    const types = pokemons.map(({ type }) => type)
      .filter((el, i, arr) => arr.indexOf(el) === i);
    const typeBtn = screen.getAllByTestId('pokemon-type-button');

    expect(typeBtn).toHaveLength(types.length);
  });

  it(`A partir da seleção de um tipo, a Pokédex deve circular somente 
    pelos pokémons daquele tipo`, () => {
    renderWithRouter(<App />);

    const electricBtn = screen.getByRole('button', { name: /Electric/i });
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(electricBtn);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeDefined();
    expect(nextBtn).toBeDisabled();

    const fireBtn = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fireBtn);

    const pokemonName = screen.getByTestId(nameTestId);
    expect(pokemonName).toHaveTextContent(/Charmander/i);
    userEvent.click(nextBtn);
    expect(pokemonName).toHaveTextContent(/Rapidash/i);
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeDefined();
    userEvent.click(allBtn);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokemonName = screen.getByTestId(nameTestId);
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    userEvent.click(nextBtn);
    expect(pokemonName).toHaveTextContent(/Charmander/i);
  });
});
