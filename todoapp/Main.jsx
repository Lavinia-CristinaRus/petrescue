import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Reports from './screens/Reports'
import Pets from './screens/Pets'
import Map from './screens/Map'
import Login from './screens/Login'
import Footer from './components/Footer'
import Profile from "./screens/Profile"
import Register from "./screens/Register"
import Camera from "./screens/Camera"
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/action'
import Loader from "./components/Loader"
import ChangePassword from './screens/ChangePassword'
import Verify from './screens/Verify'
import ForgetPassword from './screens/ForgetPassword'
import ResetPassword from './screens/ResetPassword'
import AddReport from './screens/AddReport'
import AddPet from './screens/AddPet'
import AddConfirmation from './screens/AddConfirmation'

const Stack = createNativeStackNavigator()

const Main = () => {
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(loadUser())

    }, [dispatch])


    const { isAuthenticated, loading } = useSelector(state => state.auth)
    return (
        loading ? <Loader /> : <NavigationContainer>

            <Stack.Navigator initialRouteName={isAuthenticated ? "reports" : "login"}>

                <Stack.Screen name='reports' component={Reports} options={{ headerShown: false }} />
                <Stack.Screen name='pets' component={Pets} options={{ headerShown: false }} />
                <Stack.Screen name='map' component={Map} options={{ headerShown: false }} />
                <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name='verify' component={Verify} options={{ headerShown: false }} />
                <Stack.Screen name='camera' component={Camera} options={{ headerShown: false }} />
                <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name='changepassword' component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name='forgetpassword' component={ForgetPassword} options={{ headerShown: false }} />
                <Stack.Screen name='resetpassword' component={ResetPassword} options={{ headerShown: false }} />
                <Stack.Screen name='addreport' component={AddReport} options={{ headerShown: false }} />
                <Stack.Screen name='addpet' component={AddPet} options={{ headerShown: false }} />
                <Stack.Screen name='addconfirmation' component={AddConfirmation} options={{ headerShown: false }} />


            </Stack.Navigator>

            {isAuthenticated && <Footer />}


        </NavigationContainer>
    )
}

export default Main