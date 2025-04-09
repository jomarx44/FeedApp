import React from 'react';
import { render } from '@testing-library/react-native';
import About from '../src/screens/AboutScreen';
import { Strings } from '../src/constant/strings';

describe('About Screen', () => {
  it('renders the main About title and key features title', () => {
    const { getByText } = render(<About />);
    expect(getByText(Strings.about)).toBeTruthy();
    expect(getByText(Strings.keyFeatures)).toBeTruthy();
  });

  it('renders all feature titles and descriptions', () => {
    const { getByText } = render(<About />);
    expect(getByText(Strings.liveDataFeed)).toBeTruthy();
    expect(getByText(Strings.liveDataFeedDescription)).toBeTruthy();
    expect(getByText(Strings.dynamicCharacterList)).toBeTruthy();
    expect(getByText(Strings.dynamicCharacterListDescription)).toBeTruthy();
    expect(getByText(Strings.interactiveDetailView)).toBeTruthy();
    expect(getByText(Strings.interactiveDetailViewDescription)).toBeTruthy();
    expect(getByText(Strings.offlineSupport)).toBeTruthy();
    expect(getByText(Strings.offlineSupportDescription)).toBeTruthy();
    expect(getByText(Strings.crossPlatformCompatibility)).toBeTruthy();
    expect(getByText(Strings.crossPlatformCompatibilityDescription)).toBeTruthy();
  });
});
