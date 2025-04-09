import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CharacterCard from '../src/components/CharacterCard';

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  it('renders character name', () => {
    const { getByText } = render(
      <CharacterCard character={mockCharacter} onPress={() => {}} />
    );
    expect(getByText('Rick Sanchez')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CharacterCard character={mockCharacter} onPress={onPressMock} />
    );
    fireEvent.press(getByTestId('characterCard'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
