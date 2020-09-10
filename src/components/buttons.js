import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        full: false,
        backgroundColor: "blue",
        color: "white",
        text: "",
        onPress: () => { },
        style: {}
    }


    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        elevation: 8,
                        backgroundColor: this.props.backgroundColor,
                        borderRadius: 5,
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        margin: 15
                    }}
                    onPress={this.props.onPress}
                >
                    <Text style={{
                        fontSize: 18,
                        color: this.props.color,
                        fontWeight: "bold",
                        alignSelf: "center"
                    }}
                    >{this.props.text}</Text>

                </TouchableOpacity>

            </View>
        )
    }
}



export { Button }