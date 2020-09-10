import {StyleSheet, Dimensions} from 'react-native';


const bottomMenuStyles = StyleSheet.create({
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
        marginLeft: 8
    },
    itemIcon: {
        color: "grey"
    }
});

const picsStyle = StyleSheet.create({
    picture: {
        width: "100%"
    }
});

export {bottomMenuStyles, picsStyle}