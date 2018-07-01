import React from 'react' 
import { StyleSheet } from 'react-native' 
import Login from '../components/auth/login' 
import * as firebase from 'firebase'
 
const config = {
    databaseURL: "https://todos-89ebb.firebaseio.com",
    apiKey: "AIzaSyAHKKjBZjUzk0D6KCFSwwXA8OMO7zFAkCM",
    authDomain: "todos-89ebb.firebaseapp.com",
}
firebase.initializeApp(config)

class LoginScreen extends React.Component { 

	static navigationOptions = {
        title : 'Login'
    }
 
    constructor(){ 
        super() 
        this.state = { 
            email : '',
            password : ''
        } 
    } 
 
    onChangeEmail = (email) => { 
	   this.setState({email}) 
	} 
 
    onChangePassword = (password) => { 
	   this.setState({password}) 
	} 
 
    register = () => {
        this.props.navigation.navigate('Register')
    }

    render() { 
        const { navigate } = this.props.navigation
            return ( 
                    <Login email={this.state.email} 
                        password={this.state.password}
                        onChangePassword={this.onChangePassword}
                        onChangeEmail={this.onChangeEmail} 
                        navigate={navigate}
                        register={this.register} /> 
                   )  
    } 
} 
 
export default LoginScreen 

