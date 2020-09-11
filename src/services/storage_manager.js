import ImagePicker from 'react-native-image-picker';
import * as RNFS from 'react-native-fs';
import { PermissionsAndroid } from "react-native";
import RNFU from 'react-native-file-utils';

const PICS_FOLDER = `${RNFU.PicturesDirectoryPath}/sinfpics`
// const PICS_FOLDER = `/storage/emulated/0/sinfpics`

const getPics = async () => {
    let files = await RNFS.readDir(PICS_FOLDER)
    files = files.filter((file) => file.isFile())
    return files.map(file => {
        return {
            name: file.name,
            source: "file://" + file.path + "#" + Math.random()
        }
    })

}

const clearFolder = async () =>{
    let files = await RNFS.readDir(PICS_FOLDER)
    files.forEach(async (file) => {
        await RNFS.unlink(file.path)
    });
}

async function savePicture(tempPath, name) {
    let fullName = `${name}.jpg`
    let destPath = `${PICS_FOLDER}/${fullName}`
    let i = 1
    while (await RNFS.exists(destPath)) {
        name = `${name}_${i}`
        fullName = `${name}.jpg`
        destPath = `${PICS_FOLDER}/${fullName}`;
        i++
    }

    await RNFS.moveFile(tempPath, destPath)
    return {
        name: name,
        path: destPath
    }
}

const prepareFolder = async () => {
    const exists = await RNFS.exists(PICS_FOLDER)
    if (!exists) {
        await RNFS.mkdir(PICS_FOLDER)
    }
}

const getImageFromCamera = async (callback) => {

    if (Platform.OS === 'android') {

        try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ])

            const permissionCamera = await PermissionsAndroid.check('android.permission.CAMERA')
            const permissionWriteStorage = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE')


            if (!permissionCamera || !permissionWriteStorage) {
                return {
                    error: 'Failed to get the required permissions.'
                }

            }
        } catch (error) {
            return {
                error: 'Failed to get the required permissions.'
            }
        }
    }
    return true

}

async function takePicture(name) {
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'pics'
        }
    }

    ImagePicker.launchCamera(options, async (response) => {
        if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const path = response.path
            // const info = await savePicture(path, name)
            return info
        }
    })

}

export { savePicture, PICS_FOLDER, getPics, clearFolder }