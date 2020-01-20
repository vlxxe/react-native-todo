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
import { Http } from '../../api/http'

export const TodoState = ({ children }) => {
	const { changeScreen } = useContext(ScreenContext)

	const initialState = {
		todos: [],
		isLoading: false,
		error: null,
	}

	const [state, dispatch] = useReducer(todoReducer, initialState)

	const addTodo = async title => {
		clearError()
		try {
			const data = await Http.post(
				'https://rn-todo-app-6da4d.firebaseio.com/todos.json',
				{ title }
			)
			dispatch({ type: ADD_TODO, title, id: data.name })
		} catch (error) {
			showError('Something has gone wrong...')
		}
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
						clearError()
						try {
							await Http.delete(
								`https://rn-todo-app-6da4d.firebaseio.com/todos/${id}.json`
							)
							changeScreen(null)
							dispatch({ type: REMOVE_TODO, id })
						} catch (error) {
							showError('Something has gone wrong...')
						}
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
			const response = await Http.get(
				'https://rn-todo-app-6da4d.firebaseio.com/todos.json'
			)
			let todos = []
			if (response !== null) {
				todos = Object.keys(response).map(key => ({
					...response[key],
					id: key,
				}))
			}
			dispatch({ type: FETCH_TODOS, todos })
		} catch (error) {
			showError('Something has gone wrong...')
		} finally {
			hideLoader()
		}
	}

	const updateTodo = async (id, title) => {
		clearError()
		try {
			await Http.patch(
				`https://rn-todo-app-6da4d.firebaseio.com/todos/${id}.json`,
				{ title }
			)
			dispatch({ type: UPDATE_TODO, id, title })
		} catch (error) {
			showError('Something has gone wrong...')
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
