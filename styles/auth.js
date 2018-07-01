import React from 'react'
import { StyleSheet } from 'react-native' 

const styles = StyleSheet.create({ 
        wrapper : { 
            flex : 1 
        }, 
        container : { 
            flex : 1, 
            alignItems : 'center', 
            justifyContent : 'center', 
            backgroundColor : '#483D8B', 
            paddingLeft : 40, 
            paddingRight : 40 
        }, 
        registrasi : { 
            fontSize : 14, 
            marginTop : 10, 
            color : '#fff', 
            fontWeight : 'bold' 
        }, 
        header : { 
            fontSize : 24, 
            marginBottom : 30, 
            color : '#fff', 
            fontWeight : 'bold' 
        }, 
        textInput : { 
            alignSelf : 'stretch', 
            padding : 16, 
            marginBottom : 20, 
            backgroundColor : '#fff' 
        }, 
        btn : { 
            alignSelf : 'stretch', 
            backgroundColor : '#FFD700', 
            padding : 20, 
            alignItems : 'center' 
      } 
  })

export default styles
