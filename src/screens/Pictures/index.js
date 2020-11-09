import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Image, View, Text, Modal, Alert, SafeAreaView } from 'react-native';
import { Container, Header, Content, Body, Button, Title, Right, Icon, Form, Item, Label, Input } from 'native-base';
import { listStyle } from './style'
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from "./BottomSheet"
import { savePicture, getPics, clearFolder, deletePicture, renamePicture } from "../../services/storage_manager"
import ImagePicker from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer'
import prompt from 'react-native-prompt-android'


class Pictures extends Component {

    constructor(props) {
        super(props)
        this.reloadPics()
    }

    state = {
        pics: [],
        objectName: "",
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
        if (this.state.objectName == "") {
            Alert.alert(
                'Nome vazio',
                'É necessário definir o nome do objeto.',
                [
                    {
                        text: 'OK',
                        onPress: () => { }
                    }
                ],
                { cancelable: false }
            );
            return
        }
        ImagePicker.launchCamera({
            quality: 1,
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
        const pic = this.state.pics[this.state.selectedPicIndex]
        prompt(
            'Novo nome',
            '',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async name => {
                        if (name == pic.name) {
                            return
                        }
                        try {
                            const source = await renamePicture(pic, name)
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
                },
            ],
            {
                type: 'text',
                cancelable: false,
                defaultValue: this.state.pics[this.state.selectedPicIndex].name,
                placeholder: 'Novo nome'
            }
        );

    }

    vizualizePic = async () => {
        this.RBSheet.close()
        this.setState({
            imageModalUrl: this.state.pics[this.state.selectedPicIndex].source,
            isModalVisible: true
        })
    }

    render() {
        return (
            <Container>
                <Header>

                    <Body>
                        <Title>SinfPics</Title>
                    </Body>
                    <Right>
                        <Button
                            onPress={this.clearFolder}
                            transparent>
                            <Icon name='trash' />
                        </Button>
                        <Button
                            onPress={this.reloadPics}
                            transparent>
                            <Icon type="AntDesign" name='reload1' />
                        </Button>
                        <Button
                            onPress={this.takePicture}
                            transparent>
                            <Icon name='camera' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Nome do objeto: </Label>
                            <Input
                                value={this.state.objectName}
                                onChangeText={text => {
                                    this.setState({
                                        objectName: text
                                    })
                                }}

                            />
                        </Item>
                    </Form>
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
                                    onPress={() => {
                                        this.setState({
                                            selectedPicIndex: index,
                                        }, this.vizualizePic)
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

                    {/* </SafeAreaView> */}
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
                </Content>
            </Container>
        );
    }
}


export default Pictures;