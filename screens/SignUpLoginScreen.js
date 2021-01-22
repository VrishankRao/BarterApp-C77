import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Modal, Dimensions, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignUpLoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            emailId: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: ''
        }
    }

    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(() => {
                console.log("user logged in successfully.")
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if (password === confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        phone_number: this.state.phoneNumber,
                        address: this.state.address,
                        email_id: this.state.emailId
                    })
                    this.setState({
                        isModalVisible: false
                    })
                    console.log("user signed up.")
                })
                .catch((error) => {
                    console.log(error.message);
                })
        }
        else {
            console.log("passwords don't match")
        }
    }


    showModal = () => ( //doesnt work with {
        <Modal
            style={{ backgroundColor: '#B0CCE8', alignSelf: 'center', marginTop: 40, width: 300, borderRadius: 30, borderColor: 'black', borderWidth: 1 }}
            animationType='slide'
            transparent={true}
            visible={true}>
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 40 }}>Sign Up</Text>
                <TextInput
                    style={{ alignSelf: 'center', width: 250, height: 50, marginTop: 20, borderWidth: 2, borderRadius: 20, borderColor: 'orange', fontSize: 17, backgroundColor: '#F0BE6E' }}
                    placeholder={' First Name'}
                    placeholderTextColor={'black'}
                    onChangeText={(text) => {
                        this.setState({
                            firstName: text
                        })
                    }} />
                <TextInput
                    style={{ alignSelf: 'center', width: 250, height: 50, marginTop: 20, borderWidth: 2, borderRadius: 20, borderColor: 'orange', fontSize: 17, backgroundColor: '#F0BE6E' }}
                    placeholder={' Last Name'}
                    placeholderTextColor={'black'}
                    onChangeText={(text) => {
                        this.setState({
                            lastName: text
                        })
                    }} />
                <TextInput
                    style={{ alignSelf: 'center', width: 250, height: 50, marginTop: 20, borderWidth: 2, borderRadius: 20, borderColor: 'orange', fontSize: 17, backgroundColor: '#F0BE6E' }}
                    placeholder={' Phone Number'}
                    placeholderTextColor={'black'}
                    keyboardType={'numeric'}
                    maxLength={10}
                    onChangeText={(text) => {
                        this.setState({
                            phoneNumber: text
                        })
                    }} />
                <TextInput
                    style={{ alignSelf: 'center', width: 250, height: 80, marginTop: 20, borderWidth: 2, borderRadius: 20, borderColor: 'orange', fontSize: 17, backgroundColor: '#F0BE6E' }}
                    placeholder={' Address'}
                    placeholderTextColor={'black'}
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            address: text
                        })
                    }} />
                <TextInput
                    style={{ alignSelf: 'center', width: 250, height: 50, marginTop: 20, borderWidth: 2, borderRadius: 20, borderColor: 'orange', fontSize: 17, backgroundColor: '#F0BE6E' }}
                    placeholder={' Email Address'}
                    placeholderTextColor={'black'}
                    keyboardType={'email-address'}
                    onChangeText={(text) => {
                        this.setState({
                            emailId: text
                        })
                    }} />
                <TextInput
                    style={{ alignSelf: 'center', width: 250, height: 50, marginTop: 20, borderWidth: 2, borderRadius: 20, borderColor: 'orange', fontSize: 17, backgroundColor: '#F0BE6E' }}
                    placeholder={' Password'}
                    placeholderTextColor={'black'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({
                            password: text
                        })
                    }} />
                <TextInput
                    style={{ alignSelf: 'center', width: 250, height: 50, marginTop: 20, borderWidth: 2, borderRadius: 20, borderColor: 'orange', fontSize: 17, backgroundColor: '#F0BE6E' }}
                    placeholder={' Confirm Password'}
                    placeholderTextColor={'black'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({
                            confirmPassword: text
                        })
                    }} />
                <TouchableOpacity style={{ alignSelf: 'center', width: 200, height: 30, borderRadius: 15, marginTop: 35, marginBottom: 30, backgroundColor: 'orange' }}
                    onPress={() => {
                        this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                    }}>
                    <Text style={{ alignSelf: 'center', fontSize: 17, marginTop: 5 }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: 'center', width: 200, height: 30, borderRadius: 15, marginTop: 3, marginBottom: 30, backgroundColor: 'orange' }}
                    onPress={() => {
                        this.setState({
                            isModalVisible: false
                        })
                    }}>
                    <Text style={{ alignSelf: 'center', fontSize: 17, marginTop: 5 }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>

    ) //doesnt work with }

    render() {
        return (
            <ScrollView>
                <View style={styling.bg}>
                    <Text style={styling.heading}>Barter App</Text>
                    <View>
                        <TextInput
                            style={styling.emailPassword}
                            placeholder={'username@domain.com'}
                            placeholderTextColor={'white'}
                            keyboardType={'email-address'}
                            onChangeText={(text) => {
                                this.setState({
                                    emailId: text
                                })
                            }} />

                        <TextInput
                            style={[styling.emailPassword, { marginTop: 20 }]}
                            placeholder={'Password'}
                            placeholderTextColor={'white'}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }} />
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styling.touchables}
                            onPress={() => {
                                this.userLogin(this.state.emailId, this.state.password)
                            }}>
                            <Text style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 15, color: 'white', fontSize: 20 }}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styling.touchables, { marginTop: 35 }]}
                            onPress={() => {
                                this.setState({
                                    isModalVisible: true
                                })
                                //this.showModal() is supposed to be here
                            }}>
                            <Text style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 15, color: 'white', fontSize: 20 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.showModal()}
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const styling = StyleSheet.create({
    bg: {
        backgroundColor: '#FFEE75',
        flex: 1,
        alignItems: 'center'
    },
    heading: {
        color: '#A91B0D',
        fontSize: 80
    },
    emailPassword: {
        backgroundColor: '#2E8A57',
        fontSize: 20,
        width: 300,
        height: 50,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 20,
        color: 'white'
    },
    touchables: {
        backgroundColor: '#008DCB',
        width: 300,
        height: 50,
        borderRadius: 20,
        marginTop: 50,
        marginLeft: 20
    }
})
