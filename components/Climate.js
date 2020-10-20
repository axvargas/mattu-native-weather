import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'

const Climate = ({ climate }) => {
    const { name, main, weather } = climate
    const kelvin = 273.15
    return (
        <View style={styles.vwClimate}>
            <Image
                source={{ uri: `https://api.openweathermap.org/img/w/${weather[0].icon}.png` }}
                style={{ width: 66, height: 58, marginBottom: -20 }}
            />
            <Text style={[styles.text, styles.actual]}>
                {parseInt(main.temp - kelvin)}
                <Text style={styles.txtTemp}>&#x2103;</Text>

            </Text>
            <View style={styles.vwTemps}>
                <Text style={styles.text}>Min{' '}
                    <Text style={styles.txtTemp}>
                        {parseInt(main.temp_min - kelvin)}&#x2103;
                    </Text>
                </Text>
                <Text style={styles.text}>Max{' '}
                    <Text style={styles.txtTemp}>
                        {parseInt(main.temp_max - kelvin)}&#x2103;
                    </Text>
                </Text>
            </View>
        </View >
    )
}

export default Climate

const styles = StyleSheet.create({
    vwClimate: {
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        marginRight: 20,
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    txtTemp: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    vwTemps: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontWeight: 'bold'
    }
})
