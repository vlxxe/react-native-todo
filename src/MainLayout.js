import React, { useState, useContext } from 'react'
import { StyleSheet, View, Alert } from 'react-native'

import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { NavBar } from './components/NavBar'
import { THEME } from './theme'
import { TodoContext } from './context/todo/todoContext'

export const MainLayout = () => {
	const todoContext = useContext(TodoContext)
	const [todoId, setTodoId] = useState(null)
	const [todos, setTodos] = useState([])

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
			todos={todoContext.todos}
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
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20,
	},
})
