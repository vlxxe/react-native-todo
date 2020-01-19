import React, { useState, useEffect, useContext, useCallback } from 'react'
import { View, FlatList, Text, Dimensions, StyleSheet } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppLoader } from '../components/ui/AppLoader'
import { AppText } from '../components/ui/AppText'
import { AppButton } from '../components/ui/AppButton'

export const MainScreen = () => {
	const {
		addTodo,
		todos,
		removeTodo,
		fetchTodos,
		isLoading,
		error,
	} = useContext(TodoContext)
	const { changeScreen } = useContext(ScreenContext)
	const [deviceWidth, setDeviceWidth] = useState(
		Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
	)

	const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

	useEffect(() => {
		loadTodos()
	}, [])

	useEffect(() => {
		const updateWidth = () => {
			const width =
				Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
			setDeviceWidth(width)
		}

		Dimensions.addEventListener('change', updateWidth)

		return () => {
			Dimensions.removeEventListener('change', updateWidth)
		}
	})

	if (isLoading) {
		return <AppLoader />
	}

	if (error) {
		return (
			<View style={styles.center}>
				<AppText style={styles.error}>{error}</AppText>
				<AppButton onPress={loadTodos}>Try again</AppButton>
			</View>
		)
	}

	let content = (
		<View
			style={{
				width: deviceWidth,
			}}
		>
			<FlatList
				data={todos}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
				)}
			/>
		</View>
	)

	if (todos.length === 0) {
		content = <Text>You don't have todo!</Text>
	}

	return (
		<View>
			<AddTodo onSubmit={addTodo} />
			{content}
		</View>
	)
}

const styles = StyleSheet.create({
	error: {
		fontSize: 20,
		color: THEME.DANGER_COLOR,
		marginBottom: 10,
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
