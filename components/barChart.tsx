import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PureChart from 'react-native-pure-chart';

export default class BarChart extends Component<{ dataSource: Array<{ [key: string]: string | number[] }>}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.chart}>
                <PureChart
                    data={this.props.dataSource}
                    type="line"
                ></PureChart>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chart: {
        marginTop: 20
    }
})
