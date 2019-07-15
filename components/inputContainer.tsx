import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default class InputsContainer extends Component<{ selectedState: string, onKeyPress: () => void }> {
    private inputs;

    constructor(props) {
        super(props);
        this.inputs = {
            City: [{ key: 'cityName', placeholder: 'Search By City Name', label: 'City' }],
            ZipCode: [{ key: 'zipCode', placeholder: 'Search By Zip Code', label: 'Zip Code' }],
            GeoLocation: [
                {key: 'lat', placeholder: '0 Latitude', label: 'Latitude' },
                {key: 'lon', placeholder: '0 Longitude', label: 'Longitude' }]
        };
    }

    render() {
        const inputs = this.inputs[this.props.selectedState].map((input) => {
            return (
                <View
                    key={input.key}
                >
                    <Text style={styles.label}>{input.label}</Text>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={this.props.onKeyPress(input.key)}
                        placeholder={input.placeholder}
                    >
                    </TextInput>
                </View>
            );
        });

        return (
            <View style={styles.container}>
                {inputs}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: 80
    },
    inputs: {
        height: '20%',
        width: '100%',
        borderBottomColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
        padding: 12
    },
    label: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold'
    }
})
