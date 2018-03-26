import React from 'react';
import {
  TouchableOpacity,
  Platform,
  Modal,
  StyleSheet,
  Text,
  Slider,
  TextInput,
  ScrollView,
  View
} from 'react-native';

export default class List extends React.Component {
  constructor (...params) {
    super(...params);
    this.renderItem = this.renderItem.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateImportance = this.updateImportance.bind(this);
    this.save = this.save.bind(this);

    this.hideModal = this.hideModal.bind(this);
  }

  state = {
    // TODO: move to a component
    id: null,
    name: '',
    importance: 5,

    modalVisible: false
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  add() {
    this.setState({ id: null, name: '', importance: 5 });
    this.showModal();
  }

  edit(item) {
    this.setState({
      id: item.name, // TODO - introduce ids, do not rely on unique names
      name: item.name,
      importance: item.value
    });
    this.showModal();
  }

  updateName(name) {
    this.setState({ name });
  }

  updateImportance(importance) {
    this.setState({ importance });
  }

  save() {
    const { id, name, importance } = this.state;
    this.props.save(id, name, importance);
    this.hideModal();
  }

  renderItem(item, i) {
    return (
      <TouchableOpacity
        onPress={!item.done ? () => this.edit(item) : null}
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
      </TouchableOpacity>
    )
  }

  render() {
    const { modalVisible, name, importance } = this.state;
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          transparent={false}
          visible={modalVisible}
          onRequestClose={this.hideModal}
        >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={this.hideModal}
            >
              <Text style={styles.label}>× Close</Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={this.updateName}
                value={name}
              />
              <Text style={styles.label}>Importance</Text>
              <Slider
                value={importance}
                onValueChange={this.updateImportance}
                step={1}
                minimumValue={1}
                maximumValue={10}
              />
            </View>
            <TouchableOpacity
              onPress={this.save}
            >
              <Text style={styles.label}>💾 Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={this.add}
        >
          <Text style={styles.label}>➕ Add new</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.list}
        >
          {data.map(this.renderItem)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    backgroundColor: 'black'
  },
  modalContent: {
    flex: 1,
    paddingVertical: 20
  },
  list: {
    flex: 1
  },
  textInput: {
    paddingHorizontal: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white'
  },
  label: {
    paddingVertical: 5,
    fontSize: 30,
    color: 'white'
  },
  item: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingVertical: 30
  },
  itemLabel: {
    fontSize: 20,
    color: 'white'
  }
});
