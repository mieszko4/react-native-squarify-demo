import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import squarify from 'squarify';

export default class Treemap extends React.Component {
  constructor (...params) {
    super(...params);
    this.renderSquare = this.renderSquare.bind(this);
  }

  renderSquare(square, i) {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressSquare(square.name)}
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

  render() {
    const { data, container } = this.props;

    const output = squarify(data, container);

    return (
      <View
        style={styles.container}
      >
        {output.map(this.renderSquare)}
      </View>
    );
  }
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
