import { StyleSheet, Text, View, Image , ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import { Button } from 'react-native-paper'
import { addRequest, getSentAdoptionRequests } from '../redux/action'

const AddRequest = ({ navigation, route }) => {
    
    const {user} = useSelector(state => state.auth)
    const { loading, message, error } = useSelector(state => state.adoption)
    const {pet} = route.params;
    const [requestMessage, setRequestMessage] = useState("");

    const dispatch = useDispatch()
    const [petId, setPetId] = useState(pet);

    const addRequestHandler = async () => {
        const myForm = new FormData();
        myForm.append("message", requestMessage);
        myForm.append("petId", petId);
        await dispatch(addRequest(myForm))
        dispatch(getSentAdoptionRequests())
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
                    <Text style={values.pStyle}>Leave a message for the pet owner to convince him to pick you for pet adoption</Text>
                </View>
            </View>
            <View style={{height: 40}}></View>
        </View>
        <View style={{alignItems: "center"}}>
        <View style={{ width: "75%", content: 'fill'}}>
            <TextInput
                style={styles.input}
                placeholder="Message"
                value={requestMessage}
                onChangeText={setRequestMessage}
                multiline
                numberOfLines={requestMessage.split('\n').length}
            />
        </View>
        <View style={{height: 20}}></View>
        <Button
            style={styles.btn}
            onPress={addRequestHandler}>
            <Text style={{ color: "#fff" }}>Send adoption request</Text>
        </Button>
        </View>
        </View>
        <View style={{height: 80}}></View>
        </ScrollView>
    );
};

export default AddRequest;

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
        content: 'fill',
    },
})

