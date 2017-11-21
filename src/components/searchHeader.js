//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions
} from "react-native";

const { width } = Dimensions.get("window");

const searchIcon = require("../assets/search.png");

// create a component
class SearchButton extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  render() {
    const { searchPress } = this.props;
    return (
      <View style={styles.container} {...this.props}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ value: text })}
          placeholder="Aramak istediğiniz karaterin adını yazınız"
        />
        <TouchableOpacity onPress={() => searchPress(this.state.value)}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={searchIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 5,
    width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30
  },
  image: {
    width: 26,
    height: 26
  },
  textInput: {
    paddingLeft: 10,
    width: 300,
    height: 25,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 12
  }
});

//make this component available to the app
export default SearchButton;
