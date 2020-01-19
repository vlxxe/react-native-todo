import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'

import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {
	ADD_TODO,
	REMOVE_TODO,
	UPDATE_TODO,
	SHOW_LOADER,
	HIDE_LOADER,
	SHOW_ERROR,
	FETCH_TODOS,
} from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({ children }) => {
	const { changeScreen } = useContext(ScreenContext)

	const initialState = {
		todos: [],
		isLoading: false,
		error: null,
	}

	const [state, dispatch] = useReducer(todoReducer, initialState)

	const addTodo = async title => {
		const response = await fetch(
			'https://rn-todo-app-6da4d.firebaseio.com/todos.json',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title }),
			}
		)
		const data = await response.json()
		console.log('data: ', data)

		dispatch({ type: ADD_TODO, title, id: data.name })
	}
	const removeTodo = id => {
		const todo = state.todos.find(t => t.id === id)
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
					onPress: async () => {
						changeScreen(null)
						await fetch(
							`https://rn-todo-app-6da4d.firebaseio.com/todos/${id}.json`,
							{
								method: 'DELETE',
								headers: { 'Content-Type': 'application/json' },
							}
						)
						dispatch({ type: REMOVE_TODO, id })
					},
				},
			],
			{ cancelable: false }
		)
	}

	const fetchTodos = async () => {
		clearError()
		showLoader()
		try {
			const response = await fetch(
				'https://rn-todo-app-6da4d.firebaseio.com/todos.json',
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				}
			)

			const data = await response.json()
			let todos = []
			if (data !== null) {
				todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
			}

			dispatch({ type: FETCH_TODOS, todos })
		} catch (error) {
			showError('Something has gone wrong...')
			console.log(error)
		} finally {
			hideLoader()
		}
	}

	const updateTodo = async (id, title) => {
		clearError()
		try {
			await fetch(`https://rn-todo-app-6da4d.firebaseio.com/todos/${id}.json`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title }),
			})
			dispatch({ type: UPDATE_TODO, id, title })
		} catch (error) {
			showError('Something has gone wrong...')
			console.log(error)
		}
	}

	const showLoader = () => dispatch({ type: SHOW_LOADER })
	const hideLoader = () => dispatch({ type: HIDE_LOADER })

	const showError = error => dispatch({ type: SHOW_ERROR, error })
	const clearError = () => dispatch({ type: SHOW_ERROR })

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				isLoading: state.isLoading,
				error: state.error,
				fetchTodos,
				addTodo,
				removeTodo,
				updateTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}
