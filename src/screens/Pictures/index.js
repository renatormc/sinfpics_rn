import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, View, Text, TextInput, Modal, Alert } from 'react-native';
import ToolBar from './ToolBar'
import { bottomMenuStyles, listStyle } from './style'
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from "./BottomSheet"
import { savePicture, getPics, clearFolder, deletePicture, renamePicture } from "../../services/storage_manager"
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux'
import ImageViewer from 'react-native-image-zoom-viewer'


class Pictures extends Component {

    constructor(props) {
        super(props)
        this.reloadPics()
    }

    state = {
        pics: [
            // { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            // { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            // { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            // { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            // { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            // { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" },
            // { name: "teste", source: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2974401:1596714334/Chaves.jpg?f=16x9&$p$f=637b399" }
        ],
        objectName: "C1",
        selectedPicIndex: -1,
        isModalVisible: false,
        imageModalUrl: ""

    }

    openBottomSheet() {

    }

    reloadPics = async () => {
        const pics = await getPics()
        this.setState({
            pics: pics
        })
    }

    clearFolder = async () => {
        Alert.alert(
            'Deletar todas',
            'Tem certeza de que deseja deletar todas as fotos?',
            [
              
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'SIM', onPress: async () => {
                        await clearFolder()
                        this.reloadPics()
                    }
                }
            ],
            { cancelable: false }
        );


    }

    takePicture = async () => {
        // if (Platform.OS === 'android') {

        // }
        if (this.state.objectName == "") {
            return
        }
        ImagePicker.launchCamera({
            quality: 1,
            mageFileType: 'png',
            storageOptions: {
                skipBackup: true,
                privateDirectory: true
            },
        }, async (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const path = response.path


                try {
                    const info = await savePicture(path, this.state.objectName)
                    this.setState({
                        pics: [...this.state.pics, { source: "file://" + info.path + "#" + Math.random(), name: info.name }]
                    });
                } catch (error) {
                    console.log(error)
                }


            }
        });
    }

    deletePic = async () => {
        this.RBSheet.close();
        try {
            await deletePicture(this.state.pics[this.state.selectedPicIndex])
            let pics = this.state.pics
            pics.splice(this.state.selectedPicIndex, 1)
            this.setState({
                pics: pics,
                selectedPicIndex: -1
            })
        } catch (error) {
            alert(error)
        }
        
    }

    renamePic = async () => {
        this.RBSheet.close();
        try {
            const name = 'H1'
            const source = await renamePicture(this.state.pics[this.state.selectedPicIndex], name)
            let pics = this.state.pics
            pics[this.state.selectedPicIndex] = {
                source: source,
                name: name
            }
            this.setState({
                pics: pics
            })
        } catch (error) {
            alert(error)
        }
    }

    vizualizePic = async () => {
        this.RBSheet.close()
        this.setState({
            imageModalUrl: this.state.pics[this.state.selectedPicIndex].source,
            isModalVisible: true
        })
        // Actions.viewer({ source: this.state.pics[this.state.selectedPicIndex].source })
    }

    // showModalFunction(visible) {
    //     this.setState({ isModelVisible: false });
    // }


    render() {
        return (
            <View style={{
                height: "100%",
                paddingBottom: 50
            }}>
                <ToolBar
                    onCamPress={this.takePicture}
                    onReloadPress={this.reloadPics}
                    onDeletePress={this.clearFolder}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => {
                        this.setState({
                            objectName: text
                        })
                    }}
                    value={this.state.objectName}
                />

                <SafeAreaView>

                    <FlatList
                        horizontal={false}
                        data={this.state.pics}
                        numColumns={3}
                        renderItem={({ item, index }) => (
                            // <View style={listStyle.itemContainer}>
                            <TouchableOpacity
                                style={listStyle.itemContainer}
                                delayLongPress={200}
                                onPress={()=>{
                                    this.setState({
                                        selectedPicIndex: index
                                    })
                                    this.vizualizePic()
                                }}
                                onLongPress={() => {
                                    this.setState({
                                        selectedPicIndex: index
                                    })
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
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={false}
                    onRequestClose={() => {
                        this.setState({ isModalVisible: false })
                    }}>
                    <ImageViewer imageUrls={[{ url: this.state.imageModalUrl, },]} />
                </Modal>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    // height={300}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            height: 200
                        }
                    }}
                >
                    <BottomSheet
                        onDeletePress={this.deletePic}
                        onVizualizePress={this.vizualizePic}
                        onRenamePress={this.renamePic}
                    />
                </RBSheet>

            </View>

        );
    }
}

// const styles = StyleSheet.create({

// });

export default Pictures;