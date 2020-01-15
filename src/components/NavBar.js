import React from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../theme'
import { AppText } from './ui/AppText'

export const NavBar = ({ title }) => {
	return (
		<View style={styles.navbar}>
			<AppText style={styles.text}>{title}</AppText>
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
