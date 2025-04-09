import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Strings } from '../constant/strings';
import Colors from '../constant/color';

const About: React.FC = () => {
  const {
    keyFeatures,
    liveDataFeed,
    liveDataFeedDescription,
    dynamicCharacterListDescription,
    interactiveDetailViewDescription,
    offlineSupportDescription,
    crossPlatformCompatibilityDescription,
    dynamicCharacterList,
    interactiveDetailView,
    offlineSupport,
    crossPlatformCompatibility,
  } = Strings;

  const dataList = [{
    title: liveDataFeed,
    description: liveDataFeedDescription,
  }, {
    title: dynamicCharacterList,
    description: dynamicCharacterListDescription,
  }, {
    title: interactiveDetailView,
    description: interactiveDetailViewDescription,
  }, {
    title: offlineSupport,
    description: offlineSupportDescription,
  }, {
    title: crossPlatformCompatibility,
    description: crossPlatformCompatibilityDescription,
  }];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{Strings.about}</Text>
      <Text style={styles.textKey}>{keyFeatures}</Text>
      {dataList.map((item) => (
        <View key={item.title}>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textDescription}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>

  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.tertiary,
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
  },
  textKey: {
    color: Colors.tertiary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '800',
  },
  textTitle: {
    color: Colors.tertiary,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 16,
  },
  textDescription: {
    color: Colors.tertiary,
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 16,
    marginLeft: 16,
    marginBottom: 16,
  },
});
