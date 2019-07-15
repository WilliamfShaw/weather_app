import React, { Component } from 'react';
import { Picker, View, StyleSheet } from 'react-native';
import InputContainer from './inputContainer';
import ButtonContainer from './button';
import BarChart from './barChart'
import { getWeather } from '../helpers/weatherHelper';

interface MainState {
    selected: string,
    opts: {
        [key: string]: string,
        system: string
    },
    chartData?: Array<{ [key: string]: string | number[] }>
}

export default class Main extends Component<{}, MainState> {
    constructor(props) {
        super(props);

        this.state = {
            selected: '',
            opts: {
                system: 'imperial'
            }
        };
        this.pickerValueChanged = this.pickerValueChanged.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    pickerValueChanged(value) {
        this.setState({
            selected: value
        });
    }

    async handleClick() {
        const weatherData = await getWeather(this.state.selected, this.state.opts);
        this.setWeatherChartState(weatherData);
    }

    setWeatherChartState(weatherData) {
        this.setState({
            chartData: [
                { x: 'temperature', y: weatherData.main.temp},
                { x: 'humidity', y: weatherData.main.humidity},
                { x: 'pressure', y: weatherData.main.pressure},
            ]
        });
    }

    onKeyPress(option) {
        return (e) => {
            this.setState({
                opts: {
                    ...this.state.opts,
                    [option]: e
                }
            });
        }
    }

    componentDidMount() {
         navigator.geolocation.getCurrentPosition(async (currentLocation: Position) => {
            const { coords: { latitude: lat, longitude: lon }} = currentLocation;
            const weatherData = await getWeather('GeoLocation', {
                lat,
                lon,
                system: 'imperial'
            });
            this.setWeatherChartState(weatherData);
        }, (err) => console.error(err));
    }

    render() {
        let button;
        let inputs;
        let chart;

        if (this.state.selected) {
            inputs = <InputContainer selectedState={this.state.selected} onKeyPress={this.onKeyPress}/>
            button = <ButtonContainer handleClick={this.handleClick}/>
        }

        if(this.state.chartData) {
            chart = <BarChart dataSource={this.state.chartData} />
        }

        return (
            <View>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.selected}
                    onValueChange={this.pickerValueChanged}
                >
                    <Picker.Item label="Search By"/>
                    <Picker.Item label="City Name" value="City" />
                    <Picker.Item label="Zip Code" value="ZipCode" />
                    <Picker.Item label="Geo Location" value="GeoLocation" />
                </Picker>
                {inputs}
                {button}
                {chart}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        backgroundColor: 'white',
        width: 200,
        marginBottom: 10,
        padding: 10
    }
});
