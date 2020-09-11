import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
// import IconA from 'react-native-vector-icons/AntDesign'

class ToolBar extends Component {

  
  btn = (params) => {
    return (
      <TouchableOpacity

        style={styles.button}
        onPress={params.onPress}>
        {params.text != undefined
          ? <Text style={styles.buttonText}>{params.text}</Text>
          : <></>
        }
        <Icon style={styles.buttonIcon} name={params.icon} color="white" size={20} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SinfPics</Text>
        <View style={styles.buttonContainer}>
          {this.btn({ icon: 'delete', onPress: this.props.onDeletePress })}
          {this.btn({ icon: 'reload1', onPress: this.props.onReloadPress })}
          {this.btn({ icon: 'camera', onPress: this.props.onCamPress })}
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 60,
    backgroundColor: "#0074D9",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    alignContent: "center"
  },

  title: {
    color: "white",
    fontSize: 20
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    flex: 1,

  },

  button: {
    marginLeft: 25,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#39CCCC",
    // padding: 5,
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    elevation: 1
    // margin: 15
  },

  buttonIcon: {

  },

  buttonText: {
    color: "white",
    margin: 5,
    fontSize: 15
  }

});


export default ToolBar 