import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'
import { Icon } from 'react-native-elements'

const config = {
    databaseURL: "https://todos-89ebb.firebaseio.com"
}
firebase.initializeApp(config)


export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
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
                deskripsi : this.state.deskripsi
            }
        })
        this.setState({judul : '', deskripsi : '', edit : false, key : ''})
    }

  }


  componentDidMount(){
    firebase.database().ref('todos/').on('value', (snapshot) => {
        const todos = snapshot.val()
        this.setState({ todos : todos, isLoading : false })
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
  }, 
  btn : { 
    marginBottom : 20,
	alignSelf : 'stretch', 
	backgroundColor : '#7FFFD4', 
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
    borderRadius : 6
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
