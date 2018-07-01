import React from 'react' 
import Register from '../components/auth/register' 
import * as firebase from 'firebase'

class RegisterScreen extends React.Component { 

	static navigationOptions = {
        title : 'Registrasi'
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
        
        if(this.state.email === ""){
            alert('Silakan masukan email anda')
        }else if(this.state.password === ""){
            alert('Silakan password anda')
        }else{

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.props.navigation.navigate('Todo')
                })
                .catch((error) => {
                    // Handle Errors Here
                    alert(error)
                    console.log(error)
                    var errorCode = error.code
                    var errorMessage = error.message
                })
        }
    } 
 
    render() { 
            return ( 
                    <Register email={this.state.email} 
                        password={this.state.password}
                        onChangePassword={this.onChangePassword}
                        onChangeEmail={this.onChangeEmail} 
                        register={this.register} /> 
                   )  
    } 
} 

export default RegisterScreen 

