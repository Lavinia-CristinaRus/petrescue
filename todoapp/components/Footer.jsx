import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native"

const Footer = () => {

    const navigation = useNavigation()
    return (
        <View
            style={{
                padding: 30,
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate("reports")}>
                <Icon name="exclamation-triangle" size={30} color="#759" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("pets")}>
                <Icon name="paw" size={30} color="#759" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                <Icon name="user-alt" size={30} color="#759" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("donate")}>
                <Icon name="piggy-bank" size={30} color="#759" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer