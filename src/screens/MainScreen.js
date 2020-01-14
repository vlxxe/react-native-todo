import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
	let content = (
		<FlatList
			data={todos}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
				<Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
			)}
		/>
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
