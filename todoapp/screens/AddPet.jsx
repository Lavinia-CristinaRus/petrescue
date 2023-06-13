import { StyleSheet, Text, View, Image , ScrollView, TextInput, TouchableOpacity, ProgressViewIOSComponent} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { addPet, getAllPets, loadUser } from '../redux/action';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dropdown } from 'react-native-element-dropdown';
import mime from 'mime';
//to add characteristics

const AddPet = ({ navigation, route }) => {
    
    const {user} = useSelector(state => state.auth)
    const [petName, setPetName] = useState("");
    const [petDescription, setPetDescription] = useState("");
    const [petImage, setPetImage] = useState("");
    const [location, setPetLocation] = useState("");
    const { loading, message, error } = useSelector(state => state.message)
    const [animal, setAnimal] = useState("");
    const [size, setSize] = useState("");
    const [ageCategory, setAgeCategory] = useState("");
    const [aggressionLevel, setAggressionLevel] = useState("");
    const [health, setHealth] = useState("");

    const animals = [
        { label: 'Dog', value: "dog" },
        { label: 'Cat', value: "cat" },
        { label: 'Other', value: "other" },
    ];

    const sizes = [
        { label: 'Small', value: "small" },
        { label: 'Medium', value: "medium" },
        { label: 'Large', value: "large" },
        { label: 'Giant', value: "giant" },
    ];

    const ageCategories = [
        { label: 'Young', value: "young" },
        { label: 'Mature', value: "mature" },
        { label: 'Senior', value: "senior" },
    ];

    const aggressionLevels = [
        { label: 'Low', value: "low" },
        { label: 'Medium', value: "medium" },
        { label: 'High', value: "high" },
    ];

    const healthStates = [
        { label: 'Sick', value: "sick" },
        { label: 'Healthy', value: "healthy" },
    ];

    const dispatch = useDispatch()

    const handleImage = () => {
        navigation.navigate("camera", {
            addPet: true
        })
    };

    useEffect(() => {

        if (route.params) {
            if (route.params.image) {
                setPetImage(route.params.image)
            }
        }

    }, [route])

    const addPetHandler = async () => {
        const myForm = new FormData();
        myForm.append("petName", petName);
        myForm.append("petDescription", petDescription);
        myForm.append("animal", animal);
        myForm.append("size", size);
        myForm.append("ageCategory", ageCategory);
        myForm.append("aggressionLevel", aggressionLevel);
        myForm.append("health", health);
        myForm.append("location", location);
        myForm.append("petImage", {
            uri: petImage,
            type: mime.getType(petImage),
            name: petImage.split("/").pop()
        })

        await dispatch(addPet(myForm))
        await dispatch(getAllPets("", "", "", "", "", ""))
        await dispatch(loadUser());
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
        <ScrollView horizontal={false} style={styles.containerBig} keyboardShouldPersistTaps={'handled'}>
        <View style={{justifyContent: 'center'}}>
        <View style={styles.horizontalPaddingView}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: user.avatar.url}}/>
                <View style={{paddingHorizontal: 20}}>
                    <Text style={values.h1Style}>Hello, {user.name}</Text>
                    <Text style={values.pStyle}>Tell us about the pet you want to give for adoption</Text>
                </View>
            </View>
            <View style={{height: 40}}></View>
        </View>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={handleImage}>
            <View style={stylesChoosePhoto.container}>
                <Image style={stylesChoosePhoto.image} source={{ uri: petImage ? petImage : null}}/>
                {!petImage &&
                <>
                <Image style={stylesChoosePhoto.icon} source={require('../assets/uploadPetImage.jpg')}/>
                <Text style={values.h2Style}>Choose a Photo</Text>
                </>}
            </View>
        </TouchableOpacity>
        <View style={{height: 15}}></View>
        <View style={{alignItems: "center"}}>
        <View style={{ width: "75%"}}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={petName}
                onChangeText={setPetName}
            />
        </View>
        <View style={{ width: "75%", content: 'fill'}}>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={petDescription}
                onChangeText={setPetDescription}
                multiline
                numberOfLines={petDescription.split('\n').length}
            />
        </View>
        <View style={{height: 20}}></View>
        <View style={{ width: "75%"}}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={animals}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Animal"
                value={animal}
                onChange={item => {
                    setAnimal(item.value);
                }}
            />
            <View style={{height: 20}}></View>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={sizes}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Size"
                value={size}
                onChange={item => {
                    setSize(item.value);
                }}
            />
            <View style={{height: 20}}></View>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={ageCategories}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Age category"
                value={ageCategory}
                onChange={item => {
                    setAgeCategory(item.value);
                }}
            />
            <View style={{height: 20}}></View>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={aggressionLevels}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Aggression level"
                value={aggressionLevel}
                onChange={item => {
                    setAggressionLevel(item.value);
                }}
            />
            <View style={{height: 20}}></View>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                data={healthStates}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Health"
                value={health}
                onChange={item => {
                    setHealth(item.value);
                }}
            />
        </View>
        <View style={{height: 20}}></View>
        <View style={{flex: 1,width: "80%", alignItems: "center"}}>
            <ScrollView horizontal={true} style={{ width: "100%", height:'100%'}} keyboardShouldPersistTaps={'handled'}>
                <GooglePlacesAutocomplete
                    placeholder = "Insert area for picking up the pet (city, region)"
                    debounce={400}
                    query = {{
                        key:"AIzaSyAUqWMPfAQS19hQYWNffvRAqm0aHqja9IY",
                    }}
                    styles={{
                    textInputContainer: {
                        borderBottomWidth : 1.0,
                        borderBottomColor: 'grey',
                        padding: 0,
                        justifyContent: "center",
                        alignItems: "center"
                    }
                    }}
                    onPress={item=>{setPetLocation(item.description)}}
                />
            </ScrollView>
        </View>
        <View style={{height: 30}}></View>
        <Button
            style={styles.btn}
            onPress={addPetHandler}>
            <Text style={{ color: "#fff" }}>Add Pet</Text>
        </Button>
        <View style={{height: 80}}></View>
        </View>
        </View>
        </ScrollView>
    );
};

export default AddPet;

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
    },
    pWhiteStyle: {
        color: 'white',
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
        marginVertical: 10,
        fontSize: 15,
    },
    btn: {
        backgroundColor: "#759",
        padding: 5,
        width: "70%",
    },
    dropdown:{
        borderBottomWidth : 1.0,
        borderBottomColor: 'grey',
        padding: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    dropdownPlaceholder:{
        color: "#b5b5b5",
    }
})

