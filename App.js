import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import { NavBar } from './src/components/NavBar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

async function loadApp() {
	await Font.loadAsync({
		'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
		'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)
	const [todoId, setTodoId] = useState(null)
	const [todos, setTodos] = useState([])

	if (!isReady) {
		return (
			<AppLoading
				startAsync={loadApp}
				onError={err => console.log(err)}
				onFinish={() => setIsReady(true)}
			/>
		)
	}

	const addTodo = title => {
		setTodos(prev => [
			...prev,
			{
				id: Date.now().toString(),
				title,
			},
		])
	}

	const removeTodo = id => {
		const todo = todos.find(t => t.id === id)
		Alert.alert(
			'Delete todo',
			`Delete '${todo.title}' todo?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => {
						setTodoId(null)
						setTodos(prev => prev.filter(todo => todo.id !== id))
					},
				},
			],
			{ cancelable: false }
		)
	}

	const updateTodo = (id, title) => {
		setTodos(prev =>
			prev.map(todo => {
				if (todo.id === id) {
					todo.title = title
				}
				return todo
			})
		)
	}

	let content = (
		<MainScreen
			todos={todos}
			addTodo={addTodo}
			removeTodo={removeTodo}
			openTodo={setTodoId}
		/>
	)

	if (todoId) {
		const SelectedTodo = todos.find(todo => todo.id === todoId)
		content = (
			<TodoScreen
				goBack={() => setTodoId(null)}
				onRemove={removeTodo}
				todo={SelectedTodo}
				onSave={updateTodo}
			/>
		)
	}

	return (
		<View>
			<NavBar title="Todo App" />
			<View style={styles.container}>{content}</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
})
