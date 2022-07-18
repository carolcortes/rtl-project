import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testes do componente About.js', () => {
  it('A página contém informações sobre a Pokédex', () => {
    render(<About />);

    const pokedexInfo = screen.getByText(/This application simulates a Pokédex/i);

    expect(pokedexInfo).toBeDefined();
  });

  it('A página contém um h2 com o texto \'About Pokedex\'', () => {
    render(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(aboutTitle).toBeDefined();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const texts = screen.getAllByText(/pokémons/i);

    expect(texts).toHaveLength(2);
  });

  it('A página contém a imagem de uma Pokédex', () => {
    render(<About />);

    const pokedexImg = screen.getByRole('img').src;
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg).toBe(urlImg);
  });
});
