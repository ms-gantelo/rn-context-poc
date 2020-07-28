import React, { memo, useContext, useMemo, useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList } from 'react-native';

import { Input } from '../../shared/Input/Input';
import { ListItem } from './components/ListItem';
import { useArtistEffect } from '../../store/artist/useArtistEffect';
import { IArtist } from '../../store/artist/state';
import { GlobalContext } from '../../store/GlobalState';
import { styles } from './styles';

// prettier-ignore
const initialSearchList = ["Beyoncé","Bob Dylan","Elvis Presley","Eminem","Elton John","Taylor Swift","Madonna","Michael","Jackson","Drake","Bruce","Springsteen","Johnny Cash","Lady Gaga","Kanye West","Rihanna","Jay Z","Chuck Berry","David Bowie","Katy Perry","Eric Clapton","Janet Jackson","Mariah Carey","Justin Bieber","Rod Stewart","Justin","Timberlake","Neil Young","Willie Nelson","Jimi Hendrix","Ariana","Grande","Prince","Stevie","Wonder","Neil Diamond","Ed Sheeran","Adele","Diana Ross","James Brown","Bruno Mars","Bob Marley","James Taylor","Shania Twain","Britney","Spears","Marvin Gaye","B. B. King","Otis Redding","Billy Joel","Whitney","Houston","Buddy Holly","Frank Sinatra","Amy","Winehouse","Ray Charles","George Strait","Tim McGraw"];

export interface Props {
  navigation: StackNavigationProp<any>;
}

const List = ({ navigation }: Props) => {
  const [searchState, setSearchState] = useState({ search: '', id: '' });
  const { state } = useContext(GlobalContext);
  const { searchArtist } = useArtistEffect();

  const list = useMemo(
    () =>
      Object.values(state.artist.artistMap).map(artist => ({
        artist,
        albumCount: Object.values(state.album.albumMap[artist.idArtist] || {}).length
      })),
    [state.artist.artistMap, state.album.albumMap]
  );
  const selectedArtist = state.artist.artistMap[searchState.id];

  const keyExtractor = useCallback(({ artist }: { artist: IArtist }) => artist.idArtist, []);
  const onSearchChange = useCallback((search: string) => setSearchState(prev => ({ ...prev, search })), []);
  const onSubmitEditing = useCallback(async () => {
    const id = await searchArtist(searchState.search);
    setSearchState(prev => ({ ...prev, search: '', id }));
  }, [searchState.search]);
  const renderItem = useCallback(
    ({ item }: { item: { artist: IArtist; albumCount: number } }) => (
      <ListItem artist={item.artist} albumCount={item.albumCount} onPress={() => navigation.navigate('Artist', { id: item.artist.idArtist })} />
    ),
    []
  );

  useEffect(() => initialSearchList.forEach(searchArtist), []);

  return (
    <View style={{ flex: 1 }}>
      <Input
        style={styles.inputContainer}
        onChangeText={onSearchChange}
        value={searchState.search}
        onSubmitEditing={onSubmitEditing}
        placeholder="Search your Musician"
        placeholderTextColor="gray"
      />
      {selectedArtist && (
        <View style={styles.selectedContainer}>
          {renderItem({ item: { artist: selectedArtist, albumCount: Object.keys(state.album.albumMap[selectedArtist.idArtist] || {}).length } })}
        </View>
      )}
      <FlatList data={list} keyExtractor={keyExtractor} renderItem={renderItem} />
    </View>
  );
};

export default memo(List);
