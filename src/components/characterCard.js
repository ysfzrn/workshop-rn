//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('screen');

// create a component
class CharacterCard extends Component {
    render() {
        const { character, characterPress } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={()=>characterPress(character)} > 
                <Image style={styles.image} source={{uri: `${character.thumbnail.path}.${character.thumbnail.extension}` }}/>
                <Text style={styles.text}>{character.name} </Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width,
        height:130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width,
        height:130,
    },
    text:{
        position:'absolute',
        right:10,
        top:10,
        backgroundColor:'transparent',
        fontWeight:'800',
        color:'#EEEEEE',
        fontSize:18
    }
});

//make this component available to the app
export default CharacterCard;
