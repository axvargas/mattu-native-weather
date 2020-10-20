import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	ActivityIndicator
} from 'react-native';
import axios from 'axios'
import Form from './components/Form'
import Climate from './components/Climate'
const App = () => {
	const kelvin = 273.15
	const initialBgColor = 'rgb(71, 149, 212)'
	const [search, setSearch] = useState({})
	const [consultAPI, setConsultAPI] = useState(false)
	const [climate, setClimate] = useState(null)
	const [loading, setLoading] = useState(false)
	const [bgColor, setBgColor] = useState(initialBgColor)
	useEffect(() => {
		const getClimate = async () => {
			setLoading(true)
			const APIkey = '4cde0c22195be47a9c61644884cda683'
			const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${APIkey}`
			try {
				const response = await axios.get(URL)
				setClimate(response.data)
				const actualTemp = response.data.main.temp - kelvin
				if (actualTemp < 10) {
					setBgColor('rgb(105, 108, 149)')
				} else if (actualTemp >= 10 && actualTemp < 25) {
					setBgColor(initialBgColor)
				} else {
					setBgColor('rgb(178, 28, 61)')
				}
				setLoading(false)
			} catch (error) {
				setLoading(false)
				setClimate(null)
				setBgColor(initialBgColor)
				if (error.response) {
					showAlert(error.response.data.message);
				} else {
					console.log(error);
					showAlert("There was an error");
				}
			}
		}
		if (consultAPI) {
			getClimate()
			setConsultAPI(false)
		}
	}, [consultAPI])

	const hideKeyboard = () => {
		Keyboard.dismiss()
	}

	const bgColorApp = {
		backgroundColor: bgColor
	}

	const showAlert = (msg) => {
		Alert.alert(
			"Error",
			msg.charAt(0).toUpperCase() + msg.slice(1),
			[
				{ text: "OK" }
			],
			{ cancelable: false }
		)
	}
	return (
		<>
			<TouchableWithoutFeedback
				onPress={() => hideKeyboard()}
			>
				<View style={[styles.vwApp, bgColorApp]}>

					<View style={styles.vwFormContent}>
						{loading &&
							<ActivityIndicator size="large" color="#FFF" />
						}
						{climate && !loading &&
							<Climate climate={climate} />
						}
						<Form setSearch={setSearch} setConsultAPI={setConsultAPI} />
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

const styles = StyleSheet.create({
	vwApp: {
		flex: 1,
		justifyContent: 'center'
	},
	vwFormContent: {
		marginHorizontal: '2.5%'
	}
});

export default App;
