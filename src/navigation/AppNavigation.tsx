import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import iconImage from '../assets/image';
import Colors from '../constant/color';
import AboutScreen from '../screens/AboutScreen';
import DetailScreen from '../screens/DetailScreen';
import FeedScreen from '../screens/FeedScreen';
import { Character } from '../types/Character';
import { NativeStackHeader } from '@react-navigation/native-stack';


export type RootStackParamList = {
  Feed: undefined;
  Details: { character: Character };
  About: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 18,
            flex: 1,
            color: Colors.tertiary,
            textAlign: 'center',
          },
          header: (props) => {

            return (
             <SafeAreaView>
              <View style={{paddingHorizontal: 10, flexDirection: 'row', height: 60, backgroundColor: Colors.primary, alignItems: 'center'}}>
          <TouchableOpacity style={{width: '20%', alignItems: 'flex-start'}} onPress={() => navigation.goBack()}>
             <Text style={{ fontSize: 15, color: Colors.tertiary }}>{props.back ? '< Back' : ''}</Text>

             </TouchableOpacity>

             <View style={{width: '60%', alignItems: 'center'}}>
             <Text style={{ fontSize: 18, color: Colors.tertiary }}>{props.options.title}</Text>

             </View>

                <TouchableOpacity
                style={{width: '20%', alignItems: 'flex-end'}}
              onPress={() => navigation.navigate('About')}
            >
              {props.options.title === 'About' ? null : <Image source={iconImage.informationButton} style={{ width: 20, height: 20}} />}
            </TouchableOpacity>
              </View>
              <View style={{ height: 1, backgroundColor: Colors.tertiary }}/>
             </SafeAreaView>
            );
          },
        })}
      >
        <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'Multiverse Feed' }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Details' }}/>
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
