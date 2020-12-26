import React,{Component} from 'react';
import {Text,View, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignUpLoginScreen extends Component{

    constructor(){
        super();
        this.state={
            emailId:'',
            password:''
        }
    }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            console.log("user logged in successfully.")
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    userSignUp=(emailId,password)=>{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            console.log("user signed up successfully.")
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    render(){
        return(
            <ScrollView>
                <View style={styling.bg}>
                    <Text style={styling.heading}>Barter App</Text>

                    <TextInput
                    style={styling.email}
                    placeholder={'username@domain.com'}
                    placeholderTextColor={'black'}
                    multiline={false}
                    keyboardType={'email-address'}
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}
                    />

                    <TextInput
                    style={styling.password}
                    placeholder={'Password'}
                    placeholderTextColor={'black'}
                    multiline={false}
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}
                    />

                    <TouchableOpacity
                    style={styling.login}
                    onPress={()=>{
                        this.userLogin(this.state.emailId,this.state.password)
                    }}>
                        <Text style={{alignSelf:'center', justifyContent:'center', marginTop:15}}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styling.signUp}
                    onPress={()=>{
                        this.userSignUp(this.state.emailId,this.state.password)
                    }}>
                        <Text style={{alignSelf:'center', justifyContent:'center', marginTop:15}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styling=StyleSheet.create({
    bg:{
        backgroundColor:'#fc847b',
        flex:1,
        alignItems:'center'
    },
    heading:{
        color:'#235cde',
        fontSize:80
    },
    email:{
        backgroundColor:'khaki',
        width:300,
        height:50,
        borderRadius:20,
        marginTop:10,
        marginLeft:20
    },
    password:{
        backgroundColor:'khaki',
        width:300,
        height:50,
        borderRadius:20,
        marginTop:20,
        marginLeft:20
    },
    login:{
        backgroundColor:'#938ab1',
        width:300,
        height:50,
        borderRadius:20,
        marginTop:50,
        marginLeft:20
    },
    signUp:{
        backgroundColor:'#938ab1',
        width:300,
        height:50,
        borderRadius:20,
        marginTop:20,
        marginLeft:20
    }
})
