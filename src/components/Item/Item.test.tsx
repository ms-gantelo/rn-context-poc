import React from 'react';
import { render } from 'react-native-testing-library';

import Item from '.';
import { getArtist_1, getMockDeps } from '../../../test-helpers';
import { GlobalProvider, initialState } from '../../store/GlobalState';

describe('Item', () => {
  it('should render', () => {
    const { toJSON } = render(
      <GlobalProvider
        deps={getMockDeps()}
        initState={{ ...initialState, artist: { ...initialState.artist, artistMap: { [getArtist_1().idArtist]: getArtist_1() } } }}
      >
        <Item route={{ params: { id: getArtist_1().idArtist } }} />
      </GlobalProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
