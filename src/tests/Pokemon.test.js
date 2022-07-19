import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do componente Pokemon.js', () => {
  const nameTestId = 'pokemon-name';

  it('É renderizado um card com as informações do pokémon selecionado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach(({ name, type, averageWeight }) => {
      const pokemonName = screen.getByTestId(nameTestId);
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');

      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toHaveTextContent(averageWeight.value);

      userEvent.click(nextBtn);
    });
  });

  it(`O card do pokémon contém um link de navegação para exibir mais detalhes. 
   O link possui a URL /pokemons/<id>, de acordo com o id do pokémon
   selecionado`, () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeDefined();

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach(({ id }) => {
      expect(moreDetails.href).toMatch(`/pokemons/${id}`);
      userEvent.click(nextBtn);
    });
  });

  it(`Ao clicar no link de navegação, é feito um redirecionamento para a 
   página de detalhes`, () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(nameTestId);
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetails);
    const detailsTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(detailsTitle).toBeDefined();
  });

  it(`Ao clicar na página de detalhes, a URL exibida no navegador muda para
   /pokemons/<id>`, () => {
    const { history } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(nameTestId);
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Na página de detalhes, existe um ícone de estrela nos pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favPokemon = screen.getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    userEvent.click(favPokemon);
    const starIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(starIcon.src).toMatch('/star-icon.svg');
  });
});
