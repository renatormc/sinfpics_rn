import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';




class PicViewer extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Image
                        style={{
                            height: 200,
                            width: 200,

                        }}
                        source={{ uri: this.props.source || '' }} />
                </ScrollView>
            </SafeAreaView>           
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {

        marginHorizontal: 20
    }
});

export default PicViewer