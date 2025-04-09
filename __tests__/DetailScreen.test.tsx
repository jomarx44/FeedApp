import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import DetailScreen from '../src/screens/DetailScreen';
import { Strings } from '../src/constant/strings';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));
jest.spyOn(Alert, 'alert');

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
};

const mockRoute = {
  params: {
    character: mockCharacter,
  },
};

describe('DetailScreen', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockReset();
    (AsyncStorage.setItem as jest.Mock).mockReset();
    (Alert.alert as jest.Mock).mockReset();
  });

  it('renders character details correctly', () => {
    const { getByText } = render(<DetailScreen route={mockRoute as any} />);
    expect(getByText(mockCharacter.name)).toBeTruthy();
    expect(getByText(`Status: ${mockCharacter.status}`)).toBeTruthy();
    expect(getByText(`Species: ${mockCharacter.species}`)).toBeTruthy();
    expect(getByText(`Gender: ${mockCharacter.gender}`)).toBeTruthy();
    expect(getByText(`Type: Unknown`)).toBeTruthy();
  });

  it('shows "Save Offline" button initially', () => {
    const { getByText } = render(<DetailScreen route={mockRoute as any} />);
    expect(getByText('Save Offline')).toBeTruthy();
  });

  it('saves character to AsyncStorage and shows alert', async () => {
    const { getByText } = render(<DetailScreen route={mockRoute as any} />);
    const button = getByText('Save Offline');
    fireEvent.press(button);
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        `@character_${mockCharacter.id}`,
        JSON.stringify(mockCharacter)
      );
      expect(Alert.alert).toHaveBeenCalledWith(Strings.saved, Strings.savedDescription);
    });
  });

  it('disables button and changes label if character is already saved', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('saved');
    const { findByText } = render(<DetailScreen route={mockRoute as any} />);
    expect(await findByText('Saved Offline')).toBeTruthy();
  });
});
