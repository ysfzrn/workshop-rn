//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const searchIcon = require("../assets/search.png");

// create a component
const SearchButton = (props) => {
    return (
        <TouchableOpacity style={styles.container} {...props} >
          <Image style={styles.image} resizeMode="contain" source={searchIcon} />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:26,
        height:26,
    },
    image:{
        width:26,
        height:26,
    }
});

//make this component available to the app
export default SearchButton;
