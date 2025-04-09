import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../constant/color';

interface CharacterCardProps {
  character: {
    id: number;
    name: string;
    image: string;
  };
  onPress: () => void;
}

const CharacterCard = ({ character, onPress }: CharacterCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} testID="characterCard">
     <Image source={{ uri: character.image }} style={styles.image} />
       <Text style={styles.name}>{character.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 300,
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.tertiary,
    shadowColor: Colors.secondary,
    shadowOpacity: 10,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
  },
  name: {
    marginTop: 20,
    color: Colors.tertiary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CharacterCard;
