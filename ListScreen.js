import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

export default class List extends React.Component {
  constructor (...params) {
    super(...params);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, i) {
    return (
      <View
        key={i}
        style={styles.item}
      >
        <Text
          style={[
            styles.itemLabel,
            item.done ? {
              color: 'gray',
              textDecorationLine: 'line-through'
            } : null
          ]}
        >
          {item.name}
        </Text>
      </View>
    )
  }

  render() {
    const { data } = this.props;

    return (
      <ScrollView
        style={styles.container}
      >
        {data.map(this.renderItem)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  item: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  itemLabel: {
    fontSize: 20,
    color: 'white'
  }
});
