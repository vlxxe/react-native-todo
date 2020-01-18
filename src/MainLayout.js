import React, { useContext } from 'react'
import { StyleSheet, View, Alert } from 'react-native'

import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { NavBar } from './components/NavBar'
import { THEME } from './theme'
import { ScreenContext } from './context/screen/screenContext'

export const MainLayout = () => {
	const { todoId } = useContext(ScreenContext)

	return (
		<View>
			<NavBar title="Todo App" />
			<View style={styles.container}>
				{todoId ? <TodoScreen /> : <MainScreen />}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20,
	},
})
