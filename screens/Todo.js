import React from 'react'
import TodoComponent from '../components/todo'

export default class Todo extends React.Component {

    static navigationOptions = {
        title : 'Todos App'
    }

    render(){
        return <TodoComponent> </TodoComponent>
    }

}

