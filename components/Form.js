import React, { useRef, useState } from 'react'
import {
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Text,
    Animated
} from 'react-native'

import { Picker } from '@react-native-community/picker'
import { useForm, Controller } from 'react-hook-form'

const Form = ({ setSearch, setConsultAPI }) => {
    const { control, handleSubmit, errors, setError } = useForm({
        defaultValues: {
            city: '',
            country: ''
        }
    })
    const cityRef = useRef()
    const countryRef = useRef()
    const animationButton = useRef(new Animated.Value(1)).current
    const animationStyle = {
        transform: [{ scale: animationButton }]
    }

    const animationIn = () => {
        Animated.spring(animationButton, {
            toValue: .75,
            useNativeDriver: true
        }).start()
    }
    const animationOut = () => {
        Animated.spring(animationButton, {
            toValue: 1,
            friction: 2,
            tension: 8,
            useNativeDriver: true
        }).start()
    }

    const onsubmit = (data) => {
        data.city.trim()
        data.country.trim()
        setSearch(data)
        setConsultAPI(true)
    }
    return (
        <View style={styles.vwForm}>
            <View>
                <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        cityRef.current.focus();
                    }}
                    rules={{
                        required: "Type the name of the city please",
                        validate: (value) => value.trim() !== '' || "Type the name of the city please"
                    }}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            placeholder="City"
                            placeholderTextColor='#666'
                            style={styles.input}
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={cityRef}
                        />
                    )}
                />
                {errors.city && <Text style={styles.txtError}>{errors.city.message}</Text>}
            </View>
            <View>
                <Controller
                    name="country"
                    control={control}
                    rules={{
                        required: "Select the country please",
                    }}
                    render={({ onChange, onBlur, value }) => (
                        <Picker
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) =>
                                onChange(itemValue)
                            }
                            selectedValue={value}
                            ref={countryRef}
                            style={styles.input}
                        >
                            <Picker.Item label="--Select the country--" value="" />
                            <Picker.Item label="United States" value="US" />
                            <Picker.Item label="Mexico" value="MX" />
                            <Picker.Item label="Argentina" value="AR" />
                            <Picker.Item label="Colombia" value="CO" />
                            <Picker.Item label="Costa Rica" value="CR" />
                            <Picker.Item label="Spain" value="ES" />
                            <Picker.Item label="Peru" value="PE" />
                            <Picker.Item label="Ecuador" value="EC" />
                        </Picker>
                    )}
                />
                {errors.country && <Text style={styles.txtError}>{errors.country.message}</Text>}
            </View>

            <TouchableWithoutFeedback
                onPressIn={() => animationIn()}
                onPressOut={() => animationOut()}
                onPress={handleSubmit(onsubmit)}
            >
                <Animated.View
                    style={[styles.btnSearch, animationStyle]}
                >
                    <Text style={styles.txtSearch}>Search climate</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    vwForm: {
        marginTop: 1
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    btnSearch: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    txtSearch: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    },
    txtError: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 18
    }
})
