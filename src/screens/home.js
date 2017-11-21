//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar
} from "react-native";
import api from "../utils/api";
import CharacterCard from "../components/characterCard";
import SearchHeader from "../components/searchHeader";

const homeIcon = require("../assets/home.png");
let scrollToEnable = false;
// create a component
class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarOnPress: (tab, jumpToIndex) => {
        if (scrollToEnable) {
          tab.route.params.handleScrollToTop();
        }
        scrollToEnable = true;
        navigation.navigate("Home");
      },
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={homeIcon}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
  };

  _handleScrollToTop = () => {
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
  };

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
      error: null,
      endLoading: false,
      offset: 0,
      filterName: null,
      refreshing:false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ handleScrollToTop: this._handleScrollToTop });
    this.getCharacters();
  }

  getCharacters = () => {
    api("characters", {
      limit: 10,
      offset: this.state.offset,
      orderBy: "-modified",
      nameStartsWith: this.state.filterName
    })
      .then(res => {
        this.setState({
          characters:
            this.state.offset === 0
              ? res.results
              : [...this.state.characters, ...res.results],
          loading: false,
          endLoading: false,
          refreshing:false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err, loading: false, endLoading: false, refreshing:false });
      });
  };

  getMoreData = () => {
    const { offset } = this.state;
    if (!this.state.endLoading) {
      this.setState(
        { endLoading: true, offset: this.state.offset + 10, refreshing:false },
        () => {
          setTimeout(() => {
            this.getCharacters();
          }, 1500);
        }
      );
    }
  };

  handleToDetail = character => {
    const { navigation } = this.props;
    navigation.navigate("Detail", { character: character });
  };

  handleSearch = name => {
    this.setState(
      {
        characters: [],
        loading: true,
        error: null,
        endLoading: false,
        offset: 0,
        filterName: name ? name : null
      },
      () => {
        this.getCharacters();
      }
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        characters: [],
        loading: true,
        error: null,
        endLoading: false,
        offset: 0,
        filterName: null
      },
      () => {
        this.getCharacters();
      }
    );
  };

  renderHeader = () => {
    return <SearchHeader searchPress={this.handleSearch} />;
  };

  renderCharacters = () => {
    const { characters,endLoading, refreshing } = this.state;
    return (
      <FlatList
        data={characters}
        ref={ref => {
          this.flatListRef = ref;
        }}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            characterPress={this.handleToDetail}
          />
        )}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        keyExtractor={item => item.id}
        onEndReached={this.getMoreData}
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
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
