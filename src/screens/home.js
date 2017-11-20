//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import api from "../utils/api";
import CharacterCard from "../components/characterCard";
import SearchHeader from "../components/searchHeader";


const homeIcon = require("../assets/home.png");
// create a component
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarOnPress: (tab, jumpToIndex) => {
      console.log(this.flatListRef);
      console.log(tab);
      console.log(jumpToIndex);
      //this.flatListRef.scrollToIndex({animated: true, index: 0});
    },
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={homeIcon}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
      error: null,
      endLoading: false,
      offset: 0,
    };
  }

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters = () => {
    const { offset } = this.state;
    api("characters", { limit: 10, offset:offset })
      .then(res => {
        this.setState({
          characters: [ ...this.state.characters, ...res.results],
          loading: false,
          endLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err, loading: false, endLoading: false, });
      });
  };


  getMoreData = () => {
    const { offset } = this.state;
    if(!this.state.endLoading){
     this.setState({ endLoading: true, offset: this.state.offset + 10 }, () => {
        setTimeout(() => {
          this.getCharacters();
        }, 1500);
      });
    }
  };

  renderHeader = () => {
    return <SearchHeader />;
  };


  renderCharacters = () => {
    const { characters } = this.state;
    console.log("yusuf", characters);
    console.log("offset", this.state.offset);
    return (
      <FlatList
        data={characters}
        ref={(ref) => { this.flatListRef = ref; }}
        renderItem={({ item }) => <CharacterCard character={item} />}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        keyExtractor={item => item.id}
        onEndReached={this.getMoreData}
        refreshing={false}
        onEndReachedThreshold={100}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.endLoading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const { loading, characters } = this.state;
    console.log(characters.length);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {loading ? (
          <ActivityIndicator animating size="large" />
        ) : (
          this.renderCharacters()
        )}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 26,
    height: 26
  }
});

//make this component available to the app
export default Home;
