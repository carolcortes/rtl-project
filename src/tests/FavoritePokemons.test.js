import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente FavoritePokemons.js', () => {
  test(`Se a pessoa não possuir pokémons favoritos, a mensagem
  'No favorite pokemon found' é exibida na tela`, () => {
    render(<FavoritePokemons />);

    const noFavorite = screen.getByText(/No favorite pokemon found/i);

    expect(noFavorite).toBeDefined();
  });

  test('Todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);

    // Favoritar pikachu:
    const pikachuDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pikachuDetails);
    const pikachu = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pikachu).toBeDefined();
    const favPikachu = screen.getByText(/Pokémon favoritado\?/i);
    userEvent.click(favPikachu);

    // Navegar até a home, ir até o próximo pokémon:
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemon);

    // Favoritar charmander:
    const charmanderDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(charmanderDetails);
    const charmander = screen.getByRole('heading', { name: /Charmander Details/i });
    expect(charmander).toBeDefined();
    const favCharmander = screen.getByText(/Pokémon favoritado\?/i);
    userEvent.click(favCharmander);

    // Exibir pokémons favoritos:
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemons);
    const favPokemonPikachu = screen.getByText(/Pikachu/i);
    const favPokemonCharmander = screen.getByText(/Charmander/i);
    expect(favPokemonPikachu).toBeDefined();
    expect(favPokemonCharmander).toBeDefined();
  });
});
