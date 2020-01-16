import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { THEME } from '../theme'
import { AppText } from './ui/AppText'

export const NavBar = ({ title }) => {
	return (
		<View
			style={{
				...styles.navbar,
				...Platform.select({
					ios: styles.navbarIos,
					android: styles.navbarAndroid,
				}),
			}}
		>
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
	},
	navbarIos: {
		backgroundColor: '#aaa',
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomColor: 20,
	},
	navbarAndroid: {
		backgroundColor: THEME.MAIN_COLOR,
	},
	text: {
		color: Platform.OS === 'android' ? '#fff' : 'black',
		fontSize: 20,
	},
})
