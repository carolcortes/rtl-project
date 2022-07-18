import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testes do componente NotFound.js', () => {
  it('A página contém um h2 com o texto \'Page requested not found 😭\'', () => {
    render(<NotFound />);

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    const cryingEmoji = screen.getByRole('img', { name: /Crying emoji/i });

    expect(notFoundTitle && cryingEmoji).toBeDefined();
  });

  it('A página mostra a imagem especificada', () => {
    render(<NotFound />);

    const notFoundImg = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' }).src;
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(notFoundImg).toBe(urlImg);
  });
});
