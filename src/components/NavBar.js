import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { THEME } from '../theme'

export const NavBar = ({ title }) => {
	return (
		<View style={styles.navbar}>
			<Text style={styles.text}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	navbar: {
		paddingBottom: 10,
		height: 70,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: THEME.MAIN_COLOR,
	},
	text: {
		color: 'white',
		fontSize: 20,
	},
})
