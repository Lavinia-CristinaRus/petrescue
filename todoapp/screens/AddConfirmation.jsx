import { StyleSheet, Text, View, Image , ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import { Button } from 'react-native-paper'
import { addConfirmation, getSentConfirmationRequests, loadUser } from '../redux/action'
import mime from 'mime'

const AddConfirmation = ({ navigation, route }) => {
    
    const {user} = useSelector(state => state.auth)
    const [confirmationDescription, setConfirmationDescription] = useState("");
    const [confirmationImage, setConfirmationImage] = useState("");
    const { loading, message, error } = useSelector(state => state.message)
    const {reportId} = route.params;

    const dispatch = useDispatch()
    const [report, setReport] = useState(reportId);
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
        const myForm = new FormData();
        myForm.append("confirmationImage", confirmationImage);
        myForm.append("confirmationDescription", confirmationDescription);
        myForm.append("reportId", report);
        myForm.append("confirmationImage", {
            uri: confirmationImage,
            type: mime.getType(confirmationImage),
            name: confirmationImage.split("/").pop()
        })

        await dispatch(addConfirmation(myForm))
        dispatch(getSentConfirmationRequests(""))
        dispatch(loadUser())
    }

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
        <View style={{height: 10}}></View>
        <View style={{alignItems: "center"}}>
        <View style={{ width: "75%", content: 'fill'}}>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={confirmationDescription}
                onChangeText={setConfirmationDescription}
                multiline
                numberOfLines={confirmationDescription.split('\n').length}
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
        width: 220,
        height: 300,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 15,
    },
    icon: {
        width: 210,
        height: 210,
        marginTop: -300
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
        content: 'fill',
    },
})

