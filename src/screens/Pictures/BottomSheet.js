import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
// import IconA from 'react-native-vector-icons/AntDesign'

class BottomSheet extends Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.item}
          onPress={this.props.onVizualizePress}
        >
          <View style={styles.itemContainer}>
            <Icon style={styles.itemIcon} name="eye" size={18} />
            <Text style={styles.text}>
              Vizualizar
                            </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={this.props.onDeletePress}
        >
          <View style={styles.itemContainer}>
            <Icon style={styles.itemIcon} name="delete" size={18} />
            <Text style={styles.text}>
              Deletar
                            </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={this.props.onRenamePress}
        >
          <View style={styles.itemContainer}>
            <Icon style={styles.itemIcon} name="edit" size={18} />
            <Text style={styles.text}>
              Renomear
                            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    flexDirection: "column"
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  item: {
    width: Dimensions.get('window').width / 2,
    padding: 15
  },
  text: {
    fontSize: 18,
    marginLeft: 30
  },
  itemIcon: {
    color: "grey"
  }
});


export default BottomSheet 