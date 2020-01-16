import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { THEME } from '../theme'

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('')

	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value)
			setValue('')
			Keyboard.dismiss()
		} else {
			Alert.alert('Title is empty!')
		}
	}

	return (
		<View style={styles.block}>
			<TextInput
				style={styles.input}
				onChangeText={setValue}
				value={value}
				placeholder="Enter todo title"
				autoCorrect={false}
				autoCapitalize="none"
			/>
			<AntDesign.Button onPress={pressHandler} name="plussquareo">
				Add Todo
			</AntDesign.Button>
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	input: {
		padding: 10,
		width: '55%',
		borderStyle: 'solid',
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_COLOR,
	},
})
