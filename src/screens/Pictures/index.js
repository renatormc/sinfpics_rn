import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, View, Text } from 'react-native';
import ToolBar from './ToolBar'
import { bottomMenuStyles, listStyle } from './style'
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from "../../components/buttons"
import FAB from "./FAB"
// import {takePicture} from "../../services/camera"


class Pictures extends Component {
    state = {
        pics: [
            { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" }
        ],
        objectName: "C1",

    }

    openBottomSheet() {

    }
   

    render() {
        return (
            <View style={{
                height: "100%"
            }}>
                <ToolBar
                    onCamPress={()=>{
                        // this.takePicture('teste')
                        alert("Camera")
                    }}
                />

                <SafeAreaView>

                    <FlatList
                        horizontal={false}
                        data={this.state.pics}
                        numColumns={2}
                        renderItem={({ item }) => (
                            // <View style={listStyle.itemContainer}>
                            <TouchableOpacity
                                style={listStyle.itemContainer}
                                onPress={() => {
                                    this.RBSheet.open();
                                }}
                            >
                                <View style={listStyle.itemInnerContainer}>
                                    <Image
                                        style={listStyle.picture}
                                        source={{ uri: item.source }} />
                                    <Text>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                            // </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </SafeAreaView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    // height={300}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }
                    }}
                >
                </RBSheet>
               
            </View>

        );
    }
}

// const styles = StyleSheet.create({

// });

export default Pictures;