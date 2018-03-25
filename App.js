import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  View
} from 'react-native';
import squarify from 'squarify';

import Treemap from "./Treemap";

const store = {
  data: [{
    name: 'Azura', value: 6, color: 'red',
  }, {
    name: 'Seth', value: 5, color: '',
    children: [
      {
        name: 'Noam', value: 3, color: 'orange',
      },
      {
        name: 'Enos', value: 2, color: 'yellow',
      },
    ]
  }, {
    name: 'Awan', value: 5, color: '',
    children: [{
        name: 'Enoch', value: 5, color: 'green',
    }]
  }, {
    name: 'Abel', value: 4, color: 'blue',
  }, {
    name: 'Cain', value: 1, color: 'indigo',
  }]
};

export default class App extends React.Component {
  constructor (...params) {
    super(...params);

    this.onPressSquare = this.onPressSquare.bind(this);
    this.onLayout = this.onLayout.bind(this);

    const { width, height } = Dimensions.get('window');

    this.state = {
      width, height,
      data: store.data,
      screen: "treemap"
    };
  }

  onPressSquare(name) {
    let node = null;
    let s1 = this.state.data.find(s => {
      if (Array.isArray(s.children)) {
        // assume one level of children
        node = s.children.find(ss => ss.name === name);
        return !!node;
      }

      return s.name === name;
    });

    if (node) {
      s1 = node;
    }

    if (!s1) {
      Alert.alert(`Could not find the name yo ${name}!`);
      return;
    }
    s1.color = "gray";

    this.forceUpdate();
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  }

  render() {
    const { width, height, data, screen } = this.state;

    const container = {
      x0: 0,
      y0: 0,
      x1: width,
      y1: height
    }

    let screenContent = <Text>Do not know what!</Text>;
    if (screen === "treemap") {
      screenContent = (
        <Treemap
          data={data}
          container={container}
          onPressSquare={this.onPressSquare}
        />
      );

    }

    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}
      >
        {screenContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: 1
});
