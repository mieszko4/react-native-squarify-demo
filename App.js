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

const data = [{
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
}];

export default class App extends React.Component {
  constructor (...params) {
    super(...params);

    this.onPressSquare = this.onPressSquare.bind(this);
    this.onLayout = this.onLayout.bind(this);

    const { width, height } = Dimensions.get('window');

    this.state = {
      width, height,
      data: data,
      screen: "treemap"
    };
  }

  updateColor(children, name, color) {
    return children.map(c => {
      if (Array.isArray(c.children)) {
        return {
          ...c,
          children: this.updateColor(c.children, name, color)
        };
      }

      if (c.name === name) {
        return {
          ...c,
          color
        }
      }

      return c;
    })
  }

  onPressSquare(name) {
    const data = this.updateColor(this.state.data, name, "gray");
    this.setState({
      data
    });
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
