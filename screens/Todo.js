import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Button } from 'react-native'
import { Icon } from 'react-native-elements'
import * as firebase from 'firebase'

export default class App extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title : 'Todos App',
            headerRight : (
                <Button onPress={ navigation.getParam('signOut') }
                    title='SignOut'
                    color='black'
                    />
            )
        }
    }

  constructor(){
    super()
    this.state = {
		email : '',
        uid : '',
        judul : '',
        deskripsi : '',
		todos : null,
        edit : false,
        key : '',
		isLoading :true
    }
  }

    submitTodo = () => {

	if(this.state.judul === "") {
        alert('Silakan isi judul')
	}else if(this.state.deskripsi === ""){
        alert('Silakan isi deskripsi')
    }else{
        var newKey
            this.state.edit ? newKey = this.state.key : newKey = firebase.database().ref().child('todos').push().key 
  
        firebase.database().ref('todos/').update({
            [newKey] : {
                judul : this.state.judul,
                deskripsi : this.state.deskripsi,
                uid : this.state.uid
            }
        })
        this.setState({judul : '', deskripsi : '', edit : false, key : ''})
    }

  }


  componentDidMount(){
    firebase.database().ref('todos/').on('value', (snapshot) => {
        console.log(snapshot)
        const todos = snapshot.val()
        this.setState({ todos : todos, isLoading : false })
    })

    this.props.navigation.setParams({ signOut : this.signOut })

    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            console.log(user)
            this.setState({ uid : user.uid, email : user.email })
        }
    })
  }

  signOut = () => {
    firebase.auth().signOut()
        .then(() => {
            this.props.navigation.navigate('Login')
        })
        .catch((error) => {
            console.log(error)
        })
  }

  renderItem = ({item}) => {
      const deskripsi = `Deskripsi : ${item.deskripsi}`
	return (
        <View style={styles.renderItem}>
                                                
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}> {item.judul } </Text>
                <Text> { deskripsi } </Text>
            </View>

            <Icon
              name='edit'
              color='#00aced'
              onPress={ () => this.editTodo(item)  } />

            <Icon
              name='delete'
              color='#00aced'
              onPress={ () => this.deleteTodo(item.key)  } />
        </View>
	)
  }

  deleteTodo = (key) => {
    firebase.database().ref('todos/' + key).remove()
  }

  editTodo = (item) => {
      this.setState({
            judul : item.judul,
            deskripsi : item.deskripsi,
            edit : true,
            key : item.key
      })
  }

  render() {

    const todos = !this.state.todos ? [] : Object.keys(this.state.todos).map( key => {
        return {
            key : key,
            judul : this.state.todos[key].judul,
            deskripsi : this.state.todos[key].deskripsi
        }
    })

    return (
      <View style={styles.container}>
        <View style={styles.card}>
            
            <Text> Hello, { this.state.email } </Text>

			<TextInput  
				style={styles.textInput} placeholder='Judul' 
				onChangeText={ (judul) => this.setState({judul :judul}) } 
				value={ this.state.judul } 
				underlineColorAndroid='transparent'  
			/> 

			<TextInput  
				style={styles.textInput} placeholder='Deskripsi' 
				onChangeText={ (deskripsi) => this.setState({deskripsi :deskripsi}) } 
				value={ this.state.deskripsi } 
				underlineColorAndroid='transparent'  
			/> 

			<TouchableOpacity 
				style={styles.btn} onPress={this.submitTodo}> 
					<Text style={{fontSize : 18 }}>  
                    {
                        this.state.edit ? 'Edit Todo' : 'Add Todo' 

                    }
                    </Text>
		   </TouchableOpacity> 
          
		 { 
           this.state.isLoading
			? 
			 <View style={styles.loading}>
				<ActivityIndicator size='large' color='#330066' animating />
			 </View>
			:
			 <View style={styles.container}>
				<FlatList
				  data={todos}
				  renderItem={ this.renderItem }
				  keyExtractor={(item,index) => index.toString()}
				/>
             </View>
		}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FF'
  },
  card : {
    flex : 1,
    margin : 5
  },
  textInput : { 
    alignSelf : 'stretch', 
    padding : 8, 
    marginBottom : 5, 
    backgroundColor : '#fff',
    borderRadius : 6,
    borderWidth : 1,
    borderColor : 'gray'
  }, 
  btn : { 
    marginBottom : 20,
	alignSelf : 'stretch', 
	backgroundColor : '#00BFFF', 
	padding : 8, 
	alignItems : 'center' 
  },
  renderItem : {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor : '#fff',
    alignSelf : 'stretch', 
	padding : 16,
    borderWidth : 1,
    borderRadius : 6,
    borderColor : 'gray'
  },
  title : {
    fontSize: 18,
    color: 'green'
  },
  loading : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },

})
