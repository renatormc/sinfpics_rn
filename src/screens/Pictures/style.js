import { StyleSheet, Dimensions } from 'react-native';


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

const listStyle = StyleSheet.create({
    picture: {
        // width: ""
        flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        
        // width: Dimensions.get('window').width / 2,
        // height: 100,
        // resizeMode:'contain',
        // margin: 5
    },
    itemContainer: {
        margin: 5,
        // flexWrap: 'wrap',
        width: "45%"
    },
    itemInnerContainer: {
        flexDirection: "column",  
        alignItems: "center",
        alignContent: "center"    
    }
});

export { bottomMenuStyles, listStyle }