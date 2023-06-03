import { StyleSheet, Text, View, Image , ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import { Button } from 'react-native-paper'
import { addConfirmation, loadUser } from '../redux/action'

const AddConfirmation = ({ navigation, route }) => {
    
    const {user} = useSelector(state => state.auth)
    const [confirmationDescription, setConfirmationDescription] = useState("");
    const [confirmationImage, setConfirmationImage] = useState("");
    const { loading, message, error } = useSelector(state => state.message)
    const {reportId} = route.params;

    const dispatch = useDispatch()

    const handleImage = () => {
        navigation.navigate("camera", {
            addConfirmation: true
        })
    };

    useEffect(() => {

        if (route.params) {
            if (route.params.image) {
                setConfirmationImage(route.params.image)
            }
        }

    }, [route])

    const addConfirmationHandler = async () => {
        await dispatch(addConfirmation(confirmationImage,confirmationDescription))
        dispatch(loadUser())
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch({ type: "clearError" });
            dispatch({ type: "clearError" });
        }
        if (message) {
            alert(message)
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, message, dispatch])

    return (
        <ScrollView style={styles.containerBig}>
        <View style={{justifyContent: 'center'}}>
        <View style={styles.horizontalPaddingView}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: user.avatar.url}}/>
                <View style={{paddingHorizontal: 20}}>
                    <Text style={values.h1Style}>Hello, {user.name}</Text>
                    <Text style={values.pStyle}>Tell us about the pet you picked up to confirm the identity</Text>
                </View>
            </View>
            <View style={{height: 40}}></View>
        </View>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={handleImage}>
            <View style={stylesChoosePhoto.container}>
                <Image style={stylesChoosePhoto.image} source={{ uri: confirmationImage ? confirmationImage : null}}/>
                {!confirmationImage &&
                <>
                <Image style={stylesChoosePhoto.icon} source={require('../assets/uploadImage.jpg')}/>
                <Text style={values.h2Style}>Choose a Photo</Text>
                </>}
            </View>
        </TouchableOpacity>
        <View style={{alignItems: "center"}}>
        <View style={{ width: "75%"}}>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={confirmationDescription}
                onChangeText={setConfirmationDescription}
            />
        </View>
        <View style={{height: 20}}></View>
        <Button
            style={styles.btn}
            onPress={addConfirmationHandler}>
            <Text style={{ color: "#fff" }}>Send confirmation request</Text>
        </Button>
        </View>
        </View>
        <View style={{height: 80}}></View>
        </ScrollView>
    );
};

export default AddConfirmation;

const stylesChoosePhoto = StyleSheet.create({
    container: {
        width: '75%',
        height: 200,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
    },
    icon: {
        width: 150,
        height: 150,
        marginTop: -200
    }
    
})

const values = {
    horizontalPadding: 25,
    verticalPadding: 20,
    h1Style: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    h2Style: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    pStyle: {
        color: 'grey',
        fontSize: 12,
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    containerBig: {
        flex: 1,
        paddingTop: values.verticalPadding + 40,
        backgroundColor: 'white'
    },
    horizontalPaddingView: {
        paddingHorizontal: values.horizontalPadding,
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 15,
        marginVertical: 15,
        fontSize: 15,
    },
    btn: {
        backgroundColor: "#759",
        padding: 5,
        width: "70%",
    },
})

