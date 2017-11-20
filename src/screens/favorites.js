//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

const favoritesIcon = require('../assets/favorites.png');
// create a component
class favorites extends Component {
    static navigationOptions = {
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={favoritesIcon}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      };
  
    render() {
        return (
            <View style={styles.container}>
                <Text>Favorites</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    icon: {
        width: 26,
        height: 26,
    },
});

//make this component available to the app
export default favorites;
