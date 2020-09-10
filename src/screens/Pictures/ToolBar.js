import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class ToolBar extends Component {

  btn = (iconName) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}>
        <Icon style={{}} name={iconName} color="white" size={18} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sinf</Text>
        <View style={styles.buttonContainer}>
          {this.btn('camera')}
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#0074D9",
    flexDirection: "row",
    padding: 9
  },

  title: {
    flex: 1,
    color: "white",
    fontSize: 20
  },

  buttonContainer: {

  },

  button: {

  },

  buttonText: {
    color: "white",
    margin: 5
  }

});


export default ToolBar 