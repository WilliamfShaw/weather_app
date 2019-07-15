import React, { Component } from 'react';
import { Button, StyleSheet, ButtonProps } from 'react-native';

export default class ButtonContainer extends Component<any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button
                title="Let's Go"
                onPress={this.props.handleClick}
            />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        borderRadius: 50,
    }
})
