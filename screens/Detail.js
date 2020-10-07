import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  DeviceEventEmitter,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Speech from "expo-speech";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 16,
      isBookmarked: false,
      html: null,
      loading: true,
      playing: false,
    };
  }

  async componentDidMount() {
    const searchWord = this.props.navigation.getParam("searchWord");
    const favoriteWordsAsync = await AsyncStorage.getItem("favoriteWords");
    let fontSize = await AsyncStorage.getItem("fontSize");
    if (!fontSize) {
      fontSize = 16;
    }
    this.favoriteWords = JSON.parse(favoriteWordsAsync);
    if (this.favoriteWords) {
      this.indexWord = this.favoriteWords.indexOf(searchWord);
    }
    fetch("http://www.moj.gov.kh/lookup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `word=${searchWord}&funcName=lookupWord&status=domain&lang=kh&ajax=1`,
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);
        let vid = data.split("font-size:");
        vid = vid
          .map((v) => v.replace(/(">|;">)/, '+1em);">'))
          .join("font-size: calc(")
          .replace("លទ្ធផលស្វែងរកសម្រាប់", "")
          .replace(", cursive'", "',Roboto , monospace,");
        this.setState({
          html: vid,
          loading: false,
          fontSize: +fontSize,
          isBookmarked:
            this.indexWord != undefined && this.indexWord >= 0 ? true : false,
        });
      });
  }

  componentWillUnmount() {
    Speech.stop();
  }
  zoomIn = () => {
    let { fontSize } = this.state;
    if (fontSize > 35) return;
    const newSize = fontSize + 4;

    this.setState(
      {
        fontSize: newSize,
      },
      () => {
        AsyncStorage.setItem("fontSize", newSize.toString());
      }
    );
  };
  speakOut = async () => {
    if (this.state.playing) {
      Speech.stop();
      this.setState({
        playing: false,
      });
      return;
    }
    const textLeft = this.state.html
      .split("Fr.")[1]
      .split("\n")
      .slice(1)
      .join("\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    Speech.speak(
      `${this.props.navigation.getParam("searchWord").split("/")[0]}`,
      {
        language: "km",
      }
    );
    Speech.speak(
      `\n${this.props.navigation
        .getParam("searchWord")
        .split("/")
        .slice(1)
        .join("\n")}\n\n`
    );
    Speech.speak(textLeft, {
      language: "km",
      onDone: () => {
        this.setState({
          playing: false,
        });
      },
    });
    this.setState({
      playing: true,
    });
  };
  zoomOut = () => {
    let { fontSize } = this.state;
    if (fontSize < 14) return;
    const newSize = fontSize - 4;
    this.setState(
      {
        fontSize: newSize,
      },
      () => {
        AsyncStorage.setItem("fontSize", newSize.toString());
      }
    );
  };

  toggleBookmark = async () => {
    if (this.state.isBookmarked) {
      this.favoriteWords = this.favoriteWords.filter(
        (v) => v !== this.props.navigation.getParam("searchWord")
      );
      AsyncStorage.setItem("favoriteWords", JSON.stringify(this.favoriteWords));
    } else {
      if (this.favoriteWords && Array.isArray(this.favoriteWords)) {
        this.favoriteWords = [
          this.props.navigation.getParam("searchWord"),
          ...this.favoriteWords,
        ];
        AsyncStorage.setItem(
          "favoriteWords",
          JSON.stringify(this.favoriteWords)
        );
      } else {
        this.favoriteWords = [this.props.navigation.getParam("searchWord")];
        AsyncStorage.setItem(
          "favoriteWords",
          JSON.stringify(this.favoriteWords)
        );
      }
    }
    this.indexWord = this.favoriteWords.indexOf(
      this.props.navigation.getParam("searchWord")
    );
    DeviceEventEmitter.emit("hi");
    this.setState({
      isBookmarked: !this.state.isBookmarked,
    });
  };

  render() {
    const { navigation } = this.props;
    const { fontSize, isBookmarked } = this.state;
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#6A0E00" size="large"></ActivityIndicator>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.controlsContainer}>
          {isBookmarked && (
            <React.Fragment>
              <TouchableOpacity
                disabled={this.favoriteWords[this.indexWord - 1] ? false : true}
                style={styles.control}
                onPress={() => {
                  navigation.replace("Detail", {
                    searchWord: this.favoriteWords[this.indexWord - 1],
                  });
                }}
              >
                <Ionicons
                  name="ios-arrow-back"
                  size={20}
                  color={
                    this.favoriteWords[this.indexWord - 1]
                      ? "#fff"
                      : "lightgrey"
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={this.favoriteWords[this.indexWord + 1] ? false : true}
                style={styles.control}
                onPress={() => {
                  navigation.replace("Detail", {
                    searchWord: this.favoriteWords[this.indexWord + 1],
                  });
                }}
              >
                <Ionicons
                  name="ios-arrow-forward"
                  size={20}
                  color={
                    this.favoriteWords[this.indexWord + 1]
                      ? "#fff"
                      : "lightgrey"
                  }
                />
              </TouchableOpacity>
            </React.Fragment>
          )}
          <TouchableOpacity
            style={styles.control}
            onPress={this.toggleBookmark}
          >
            {isBookmarked ? (
              <FontAwesome name="bookmark" size={20} color="#6A0E00" />
            ) : (
              <FontAwesome name="bookmark-o" size={20} color="#fff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.control} onPress={this.speakOut}>
            <Feather
              name={this.state.playing ? "pause-circle" : "headphones"}
              size={20}
              color={"#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.state.fontSize > 14 ? false : true}
            style={styles.control}
            onPress={this.zoomOut}
          >
            <Feather
              name="zoom-out"
              size={20}
              color={this.state.fontSize > 14 ? "#fff" : "lightgrey"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.state.fontSize < 35 ? false : true}
            style={styles.control}
            onPress={this.zoomIn}
          >
            <Feather
              name="zoom-in"
              size={20}
              color={this.state.fontSize < 35 ? "#fff" : "lightgrey"}
            />
          </TouchableOpacity>
        </View>
        {/* <ScrollView style={{ flex: 1 }}>
          <View style={styles.textContainer}>
            <Text
              style={{
                paddingBottom: 15,
                fontSize: fontSize,
              }}
            >
              Detail Screen {navigation.getParam("id")}
            </Text>
            <Text style={{ fontSize: fontSize }}>
              {navigation.getParam("body")}
            </Text>
          </View>
        </ScrollView> */}
        <WebView
          source={{
            html: `
        <html>
        <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        .img-responsive{
         width: 100%;
         height: auto;
        }
        .container{
           font-size: ${this.state.fontSize};
        }
        .mr-3{
          display: block;
          text-align: center;
          padding: 0;
          margin-bottom: -20px;
        }
        </style>
        </html>
        <body>
        <div class="container">
        ${this.state.html}
        </div>
        </body>
        `,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#bbb",
  },
  control: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  textContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
