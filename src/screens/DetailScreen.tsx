import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import Colors from '../constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Strings } from '../constant/strings';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailScreenRouteProp;
};

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { character } = route.params;
  const [isSaved, setIsSaved] = useState(false);
  const infoName: { [key: string]: string } = {
    Status: character.status,
    Species: character.species,
    Gender: character.gender,
    Type: character.type || 'Unknown',
  };
  const storageKey = `@character_${character.id}`;
  useEffect(() => {
    checkIfSaved();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkIfSaved = async () => {
    const savedItem = await AsyncStorage.getItem(storageKey);
    if (savedItem) {setIsSaved(true);}
  };

  const handleSaveOffline = async () => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(character));
      setIsSaved(true);
      Alert.alert(Strings.saved, Strings.savedDescription);
    } catch (error) {
      Alert.alert(Strings.error, Strings.failed);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{character.name}</Text>
      <View style={styles.infoContainer}>
        {Object.entries(infoName).map(([key, value]) => (
          <Text key={key} style={styles.infoText}>
            {key}: {value}
          </Text>
        ))}
      </View>
      <TouchableOpacity disabled={isSaved} style={styles.offlineButton} onPress={handleSaveOffline}>
        <Text style={styles.offlineButtonText}>
          {isSaved ? 'Saved Offline' : 'Save Offline'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.tertiary,
  },
  imageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40%',
  },
  image: {
    width: '50%',
    height: '80%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  infoContainer:{
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.secondary,
    marginBottom: 8,
  },
  offlineButton: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.tertiary,
  },
  offlineButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
  },
});

export default DetailScreen;
