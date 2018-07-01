import React from 'react' 
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native' 
import styles from '../../styles/auth'
import * as firebase from 'firebase'
 
class Login extends React.Component { 
  
    handleChangeEmail = (email) => { 
     this.props.onChangeEmail(email) 
    } 

    handleChangePassword = (password) => { 
     this.props.onChangePassword(password) 
    } 

    login = () => {

        if(this.props.email === ""){
            alert('Silakan masukan email anda')
        }else if(this.props.password === ""){
            alert('Silakan password anda')
        }else{

            firebase.auth().signInWithEmailAndPassword(this.props.email, this.props.password)
                .then(() => {
                    this.props.navigate('Todo')
                })
                .catch((error) => {
                    alert(error)
                    console.log(error)
                    var errorCode = error.code
                    var errorMessage = error.message
                })
        }
    }
 
    render() { 
        return ( 
             
           <KeyboardAvoidingView behavior='padding' style={styles.wrapper}> 
                 
                <View style={styles.container} > 
 
                    <Text style={styles.header}>  Login  </Text> 
 
                    <TextInput  
                        style={styles.textInput} placeholder='Email' 
                        onChangeText={ this.handleChangeEmail } 
                        value={ this.props.email } 
                        underlineColorAndroid='transparent'  
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                    /> 

                    <TextInput  
                        style={styles.textInput} placeholder='Password' 
                        onChangeText={ this.handleChangePassword } 
                        value={ this.props.password } 
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                    />

                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress={ this.login }> 
                            <Text style={{fontSize : 18 }}> Login </Text> 
                   </TouchableOpacity> 
 
                    <TouchableOpacity 
                        onPress={ this.props.register }> 
                        <Text 
                            style={styles.registrasi}>  
                            Tidak Punya Akun ? Registrasi Disini  
                        </Text> 
                    </TouchableOpacity>

                </View> 
             </KeyboardAvoidingView>  
           
       ) 
    } 
 
} 
 
export default Login 

