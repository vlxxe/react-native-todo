import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { THEME } from '../../theme'

export const AppLoader = () => (
	<View style={styles.loader}>
		<ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
	</View>
)

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
