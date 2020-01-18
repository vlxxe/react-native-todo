import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Modal, Alert } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'

export const EditModal = ({ visible, value, onCancel, onSave }) => {
	const [title, setTitle] = useState(value)

	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert(
				'Title is too short!',
				`Minimum number of symbols 3, symbols now ${title.trim().length}.`
			)
		} else {
			onSave(title)
		}
	}

	const cancelHandler = () => {
		setTitle(value)
		onCancel()
	}

	return (
		<Modal visible={visible} animationType="fade" transparent={false}>
			<View style={styles.wrapper}>
				<TextInput
					value={title}
					onChangeText={setTitle}
					style={styles.input}
					placeholder="Enter name todo"
					autoCapitalize="none"
					autoCorrect={false}
					maxLength={64}
				/>
				<View style={styles.button}>
					<AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
						Cancel
					</AppButton>
					<AppButton onPress={saveHandler}>Save</AppButton>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%',
	},
	button: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
})
