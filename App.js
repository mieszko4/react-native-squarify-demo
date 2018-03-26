import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';
import squarify from 'squarify';

import Treemap from './Treemap';
import ListScreen from './ListScreen';

const data = [
  {
    name: 'Azura', value: 6, color: 'red'
  },
  {
    name: 'Noam', value: 3, color: 'orange'
  },
  {
    name: 'Enos', value: 2, color: 'yellow'
  },
  {
    name: 'Enoch', value: 5, color: 'green'
  },
  {
    name: 'Abel', value: 4, color: 'blue'
  },
  {
    name: 'Cain', value: 1, color: 'indigo'
  }
];

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const getRandomColor = () => {
  const red = getRandomArbitrary(1, 255);
  const green = getRandomArbitrary(1, 255);
  const blue = getRandomArbitrary(1, 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

export default class App extends React.Component {
  constructor (...params) {
    super(...params);

    this.onPressSquare = this.onPressSquare.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.onLayout = this.onLayout.bind(this);

    const { width, height } = Dimensions.get('window');

    this.state = {
      width, height,
      data: data
    };
  }

  setDataProperty(children, name, values) {
    return children.map(c => {
      if (Array.isArray(c.children)) {
        return {
          ...c,
          children: this.setDataProperty(c.children, name, values)
        };
      }

      if (c.name === name) {
        return {
          ...c,
          ...values
        }
      }

      return c;
    })
  }

  saveItem(id, name, importance) {
    let data;
    if (id) {
      data = this.setDataProperty(this.state.data, id, { name, value: importance });
    } else { // add new
      data = [
        ...this.state.data,
        {
          name, // TODO introduce real ids
          value: importance,
          color: getRandomColor()
        }
      ]
    }
    this.setState({ data });
  }

  onPressSquare(name) {
    const data = this.setDataProperty(this.state.data, name, { done: true });
    this.setState({ data });
  }

  onLayout(e) {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
  }

  render() {
    const { width, height, data } = this.state;

    const container = {
      x0: 0,
      y0: 0,
      x1: width,
      y1: height
    }

    return (
      <ScrollView
        onLayout={this.onLayout}
        pagingEnabled
      >
        <View style={{ height }}>
          <Treemap
            data={data}
            container={container}
            onPressSquare={this.onPressSquare}
          />
        </View>
        <View style={{ height }}>
          <ListScreen
            save={this.saveItem}
            data={data}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
