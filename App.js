import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import { MainLayout } from './src/MainLayout'
import { TodoState } from './src/context/todo/TodoState'

async function loadApp() {
	await Font.loadAsync({
		'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
		'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)

	if (!isReady) {
		return (
			<AppLoading
				startAsync={loadApp}
				onError={err => console.log(err)}
				onFinish={() => setIsReady(true)}
			/>
		)
	}

	return (
		<TodoState>
			<MainLayout />
		</TodoState>
	)
}
