import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente App.js', () => {
  it('O topo da página contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeDefined();
    expect(linkAbout).toBeDefined();
    expect(linkFavoritePokemons).toBeDefined();
  });

  it('A aplicação é redirecionada para a página About, na URL /about', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const aboutTitle = screen.getAllByRole('heading', { name: /About Pokédex/i });

    expect(aboutTitle).toBeDefined();
    expect(history.location.pathname).toBe('/about');
  });

  it(`A aplicação é redirecionada para a página Favorite Pokémons,
     na URL /favorites`, () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemons);

    const favoritesTitle = screen.getAllByRole('heading', { name: /Favorite pokémons/i });

    expect(favoritesTitle).toBeDefined();
    expect(history.location.pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Home, na URL /', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);

    const homeTitle = screen.getAllByRole('heading', { name: /Encountered pokémons/i });

    expect(homeTitle).toBeDefined();
    expect(history.location.pathname).toBe('/');
  });

  it(`A aplicação é redirecionada para a página Not Found
     ao entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/carol');
    const notFoundTitle = screen.getByText(/not found/i);

    expect(notFoundTitle).toBeDefined();
  });
});
