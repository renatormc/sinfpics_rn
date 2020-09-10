import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

class FAB extends Component {

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.onPress}
                style={styles.TouchableOpacityStyle}>
                <Image
                    source={require("../../resources/camera_fab.png")}
                    style={styles.FloatingButtonStyle}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    // backgroundColor:'black'
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: "100%",
    height: "100%",
    
  },
});


export default FAB 