import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
	const [deviceWidth, setDeviceWidth] = useState(
		Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
	)

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
					<Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
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

const styles = StyleSheet.create({})
