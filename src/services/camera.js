import ImagePicker from 'react-native-image-picker';
import * as RNFS from 'react-native-fs';
import { PermissionsAndroid } from "react-native";
// import RNFU from 'react-native-file-utils';

const PICS_FOLDER = `/storage/emulated/0/sinfpics`

async function savePicture(tempPath, name) {
    let fullName = `${name}.jpg`
    const destPath = `${PICS_FOLDER}/${fullName}`;
    const exists = await RNFS.exists(newPath)
    if (exists) {
        await RNFS.unlink(newPath)
    }
    await RNFS.moveFile(tempPath, newPath)
    return {
        name: name,
        path: destPath
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
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'DCIM'
        }
    }

    return ImagePicker.launchCamera(options, callback)

}

async function takePicture(name) {
    const response = await getImageFromCamera(async (response) => {
        if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            const path = response.path
            const info = await savePicture(path, name)
            return info
        }
    })
    // getImageFromCamera().then(async (response) => {
    //     if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     } else {
    //         const path = response.path
    //         const info = await savePicture(path, name)
    //         return info
    //     }
    // })


}

export { takePicture, PICS_FOLDER }