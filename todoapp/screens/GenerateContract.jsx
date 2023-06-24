import { StyleSheet, Text, View, Image , ScrollView, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { addPet, getAllPets, loadUser } from '../redux/action';
import { Dropdown } from 'react-native-element-dropdown';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const GenerateContract = ({ navigation, route }) => {
    
    const {user} = useSelector(state => state.auth);
    const { message, error } = useSelector(state => state.pet);
    const ownerData = useSelector(state => state.pet.ownerData);
    const adopterData = useSelector(state => state.pet.adopterData);
    const [ownerAddress, setOwnerAddress] = useState(ownerData.domiciliu);
    const [adopterAddress, setAdopterAddress] = useState(adopterData.domiciliu);
    const [ownerCiNr, setOwnerCiNr] = useState(ownerData.nr_buletin);
    const [adopterCiNr, setAdopterCiNr] = useState(adopterData.nr_buletin);
    const [ownerCiSeries, setOwnerCiSeries] = useState(ownerData.serie_buletin);
    const [adopterCiSeries, setAdopterCiSeries] = useState(adopterData.serie_buletin);
    const [ownerName, setOwnerName] = useState(ownerData.nume + " " + ownerData.prenume);
    const [adopterName, setAdopterName] = useState(adopterData.nume + " " + adopterData.prenume);
    const [ownerPhone, setOwnerPhone] = useState("");
    const [adopterPhone, setAdopterPhone] = useState("");
    const [petSpecies, setPetSpecies] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petSex, setPetSex] = useState("");
    const [petBirthDate, setPetBirthDate] = useState("");
    const [petSize, setPetSize] = useState("");
    const [petColor, setPetColor] = useState("");
    const [petDinstinctiveCharacteristics, setPetDinstinctiveCharacteristics] = useState("");
    const [petHealthCard, setPetHealthCard] = useState("");
    const [petMicrochipNr, setPetMicrochipNr] = useState("");
    const date = (new Date().getDate()) + "/" + (new Date().getMonth() + 1)+ "/" + (new Date().getFullYear());
    const sexes = [
        { label: 'Female', value: "femela" },
        { label: 'Male', value: "mascul" },
    ];

    const sizes = [
        { label: 'Small', value: "mica" },
        { label: 'Medium', value: "medie" },
        { label: 'Large', value: "mare" },
    ];

    const dispatch = useDispatch();

    const html = `
        <html>
            <head>
                <title>Contract de Adoptie</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    }

                    h1 {
                    text-align: center;
                    }

                    table {
                    width: 100%;
                    border-collapse: collapse;
                    }

                    th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                    }

                    th {
                    background-color: #f2f2f2;
                    }

                    .section {
                    margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Contract de Adoptie</h1>
                <p> Data: ${date}</p>
            
                <div class="section">
                <h2>Datele persoanei care doneaza animalul, numita si donator</h2>
                <table>
                    <tr>
                    <th>Nume si prenume: </th>
                    <td>${ownerName}</td>
                    </tr>
                    <tr>
                    <th>Seria din CI:</th>
                    <td>${ownerCiSeries}</td>
                    </tr>
                    <tr>
                    <th>Numarul din CI:</th>
                    <td>${ownerCiNr}</td>
                    </tr>
                    <tr>
                    <th>Domiciliu stabil:</th>
                    <td>${ownerAddress}</td>
                    </tr>
                    <tr>
                    <tr>
                    <th>Numar de telefon:</th>
                    <td>${ownerPhone}</td>
                    </tr>
                </table>
                </div>

                <div class="section">
                <h2>Datele persoanei care adopta animalul, numita si adoptator</h2>
                <table>
                    <tr>
                    <th>Nume si prenume: </th>
                    <td>${adopterName}</td>
                    </tr>
                    <tr>
                    <th>Seria din CI:</th>
                    <td>${adopterCiSeries}</td>
                    </tr>
                    <tr>
                    <th>Numarul din CI:</th>
                    <td>${adopterCiNr}</td>
                    </tr>
                    <tr>
                    <th>Domiciliu stabil:</th>
                    <td>${adopterAddress}</td>
                    </tr>
                    <tr>
                    <tr>
                    <th>Numar de telefon:</th>
                    <td>${adopterPhone}</td>
                    </tr>
                </table>
                </div>
            
                <div class="section">
                <h2>Datele animalului adoptat</h2>
                <table>
                    <tr>
                    <th>Specie: </th>
                    <td>${petSpecies}</td>
                    </tr>
                    <tr>
                    <th>Rasa: </th>
                    <td>${petBreed}</td>
                    </tr>
                    <tr>
                    <th>Sex: </th>
                    <td>${petBreed}</td>
                    </tr>
                    <tr>
                    <th>Data nasterii: </th>
                    <td>${petBirthDate}</td>
                    </tr>
                    <tr>
                    <th>Talie: </th>
                    <td>${petSize}</td>
                    </tr>
                    <tr>
                    <th>Culoare: </th>
                    <td>${petColor}</td>
                    </tr>
                    <tr>
                    <th>Caracteristici distinctive: </th>
                    <td>${petDinstinctiveCharacteristics}</td>
                    </tr>
                    <tr>
                    <th>Carnet de sanatate: </th>
                    <td>${petHealthCard}</td>
                    </tr>
                    <tr>
                    <th>Numar microcip: </th>
                    <td>${petMicrochipNr}</td>
                    </tr>
                </table>
                </div>
            
                <div class="section">
                <h2>Angajatorul se angajeaza sa:</h2>
                    <ol>
                        <li>Sa asigure animalului donat apa, mancare, libertate de miscare, un trai decent, lipsit de stres;</li>
                        <li>Sa asigure tratament veterinar calificat in caz de vatamare sau boala;</li>
                        <li>Sa trateze cainele / pisica cu blandete;</li>
                        <li>Sa nu abandoneze animalul;</li>
                        <li>Sa nu instraineze animalul decat anuntand in prealabil Donatorul si cu acordul acestuia;</li>
                        <li>Sa ia masuri pentru a STERILIZA animalul – daca acest lucru nu a fost facut deja;</li>
                        <li>Sa permita Donatorului vizitarea animalului, cu anuntare prealabila, cel putin de 2 ori pe an, la solicitarea Donatorului, in scopul verificarii conditiilor asigurate animalului adoptat si a starii acestuia;</li>
                        <li>Sa anunte in termen de 24 de ore Donatorul in cazul pierderii sau a decesului animalului adoptat.</li>
                    </ol>
                </div>
            
                <div class="section">
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 50%; text-align: center;"">Semnatura Donator</td>
                            <td style="width: 50%; text-align: center;"">Semnatura Adoptator</td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>
    `;

    const generateContractHandler = async () => {
        const file = await printToFileAsync({
        html: html,
        base64: false
        });
        await shareAsync(file.uri)
        .then((result) => {
            if (result.action === Sharing.sharedAction) {;
                navigation.navigate("profile");
            }
        });
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
        <>
        <View style={{ alignItems: 'center', width:'100%', height:66,backgroundColor:"#759",justifyContent: 'center'}}>
            <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#eee',marginLeft:20}}>Generate contract</Text>
        </View>
        <ScrollView horizontal={false} style={styles.containerBig} keyboardShouldPersistTaps={'handled'}>
        <View style={{justifyContent: 'center'}}>
        <View style={{height: 220}}>
         <Image style={stylesChoosePhoto.icon} source={require('../assets/info1.jpg')}/>
        <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#759',marginLeft:20}}>Check and complete owner info</Text>
        </View>
        <View style={{height: 15}}></View>
        <View style={{alignItems: "center"}}>
            <View style={{ width: "75%", content: 'fill'}}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={ownerName}
                    onChangeText={setOwnerName}
                />
            </View>
            <View style={{ width: "75%", content: 'fill'}}>
                <TextInput
                    style={styles.input}
                    placeholder="Adress"
                    value={ownerAddress}
                    onChangeText={setOwnerAddress}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="CI series"
                    value={ownerCiSeries}
                    onChangeText={setOwnerCiSeries}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="CI number"
                    value={ownerCiNr}
                    onChangeText={setOwnerCiNr}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    value={ownerPhone}
                    onChangeText={setOwnerPhone}
                />
            </View>
        </View>
        <View style={{height: 15}}></View>
        <View style={{height: 220}}>
         <Image style={stylesChoosePhoto.icon} source={require('../assets/info2.jpg')}/>
        <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#759',marginLeft:20}}>Check and complete adopter info</Text>
        </View>
        <View style={{height: 15}}></View>
        <View style={{alignItems: "center"}}>
            <View style={{ width: "75%", content: 'fill'}}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={adopterName}
                    onChangeText={setAdopterName}
                />
            </View>
            <View style={{ width: "75%", content: 'fill'}}>
                <TextInput
                    style={styles.input}
                    placeholder="Adress"
                    value={adopterAddress}
                    onChangeText={setAdopterAddress}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="CI series"
                    value={adopterCiSeries}
                    onChangeText={setAdopterCiSeries}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="CI number"
                    value={adopterCiNr}
                    onChangeText={setAdopterCiNr}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    value={adopterPhone}
                    onChangeText={setAdopterPhone}
                />
            </View>
        </View>
        <View style={{height: 20}}></View>
        <View style = {{alignItems:'center', justifyContent:'center'}}>
            <View style={{height: 15}}></View>
            <View style={{height: 220}}>
                <Image style={stylesChoosePhoto.icon} source={require('../assets/info3.jpg')}/>
                <Text style={{fontSize: 16, textAlign: 'center', fontWeight:'bold', color: '#759',marginLeft:20}}>Complete pet info</Text>
            </View>
            <View style={{height: 15}}></View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Species: "
                    value={petSpecies}
                    onChangeText={setPetSpecies}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Breed"
                    value={petBreed}
                    onChangeText={setPetBreed}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Birth date"
                    value={petBirthDate}
                    onChangeText={setPetBirthDate}
                />
            </View>
            <View style={{ width: "75%"}}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    data={sexes}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Sex"
                    value={petSex}
                    onChange={item => {
                        setPetSex(item.value);
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
                    value={petSize}
                    onChange={item => {
                        setPetSize(item.value);
                    }}
                />
                <View style={{height: 20}}></View>
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Color"
                    value={petColor}
                    onChangeText={setPetColor}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Distinctive characteristics"
                    value={petDinstinctiveCharacteristics}
                    onChangeText={setPetDinstinctiveCharacteristics}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Health card"
                    value={petHealthCard}
                    onChangeText={setPetHealthCard}
                />
            </View>
            <View style={{ width: "75%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="Microcip number"
                    value={petMicrochipNr}
                    onChangeText={setPetMicrochipNr}
                />
            </View>
        </View>
        <View style={{height: 20}}></View>
        
        <Button
            style={styles.btn}
            onPress={generateContractHandler}>
            <Text style={{ color: "#fff" }}>Generate contract</Text>
        </Button>
        <View style={{height: 80}}></View>
        </View>
        </ScrollView>
        </>
    );
};

export default GenerateContract;

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
        width: 200,
        height: 200,
        marginTop: 0,
        alignSelf:'center'
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
        paddingTop: values.verticalPadding,
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
        alignSelf:'center'
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

