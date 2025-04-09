import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import Colors from '../constant/color';
import { RootStackParamList } from '../navigation/AppNavigation';
import { getCharacters } from '../services/api';
import { Character } from '../types/Character';
import { Strings } from '../constant/strings';

type FeedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Feed'>;

type Props = {
  navigation: FeedScreenNavigationProp;
};
const FeedScreen: React.FC<Props> = ({ navigation }) => {
  const [characters, setCharacters] = useState([] as Character[]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const netInfo = useNetInfo();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(async () => {
        if (netInfo.isConnected) {
          try {
            const data = await getCharacters();
            setCharacters(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          Alert.alert(
            Strings.noInternet,
            Strings.noInternetDescription,
            [
              { text: Strings.okButton, onPress: () => handleLoadOfflineCharacters() },
            ]
          );
        }
        setLoading(false);
      }, 10000);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo.isConnected]);


  const handleLoadOfflineCharacters = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    const characterKeys = allKeys.filter((key) => key.startsWith('@character_'));
    const savedItems = await AsyncStorage.multiGet(characterKeys);
    const charactersOffline = savedItems.map(([, value]) => JSON.parse(value || '{}'));
    setCharacters(charactersOffline);
  };
  const fetchCharacters = async () => {
    const data = await getCharacters();
    setCharacters((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <View  style={styles.loadingContainer}><ActivityIndicator size="large" color={Colors.secondary} /></View>}
      <FlatList
        data={characters}
        keyExtractor={(item) => `${item.id} + ${page}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <CharacterCard character={item} onPress={() => navigation.navigate('Details', { character: item })} />
            </View>
          );
        }}
        numColumns={2}
        onEndReached={fetchCharacters}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  noInternetText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondary,
    margin: 16,
  },
  loadingContainer: {
   marginVertical: 10,
  },
});

export default FeedScreen;
