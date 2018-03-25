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

export default class App extends React.Component {
  constructor (...params) {
    super(...params);

    this.onPressSquare = this.onPressSquare.bind(this);
    this.renderSquare = this.renderSquare.bind(this);
    this.onLayout = this.onLayout.bind(this);

    const { width, height } = Dimensions.get('window');

    this.state = { width, height };
  }

  onPressSquare(name) {
    Alert.alert(`Clicked ${name}!`);
  }

  renderSquare(square, i) {
    return (
      <TouchableOpacity
        onPress={() => this.onPressSquare(square.name)}
        key={i}
        style={[
          styles.square,
          {
            left: square.x0,
            width: square.x1 - square.x0,
            top: square.y0,
            height: square.y1 - square.y0,
            backgroundColor: square.color
          }
        ]}
      >
        <Text
          style={styles.squareLabel}
        >
          {square.name}
        </Text>
      </TouchableOpacity>
    )
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  }

  render() {
    const { data } = this.props;
    const { width, height } = this.state;

    const container = {
      x0: 0,
      y0: 0,
      x1: width,
      y1: height
    }

    const output = squarify(data, container);

    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}
      >
        {output.map(this.renderSquare)}
      </View>
    );
  }
}

App.defaultProps = {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  square: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  squareLabel: {
    fontSize: 10,
    color: 'white'
  }
});
