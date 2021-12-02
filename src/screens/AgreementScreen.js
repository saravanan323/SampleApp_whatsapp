/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Agreement({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to WhatsApp</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../images/initImg.jpg')} />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Read our </Text>
                <Text style={styles.linkText} onPress={() => Linking.openURL('http://google.com')}>Privacy Policy</Text>
                <Text style={styles.text}>. Tab "Agree and continue" to </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>accept the </Text>
                <Text style={styles.linkText}>Terms of Serivice</Text>
                <Text style={styles.text}>.</Text>
            </View>
            <View style={{ paddingTop: 17 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ color: 'white' }}>AGREE AND CONTINUE</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 35 }}>
                <Text style={{ fontSize: 16, color: 'black' }}>from</Text>
                <Text style={{ color: '#32CD32', marginTop: 3, letterSpacing: 2, fontWeight: 'bold', fontFamily: '' }}>FACEBOOK</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 70,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#097526',
        fontFamily: 'helvetica',
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'contain'
    },
    imageContainer: {
        width: '110%',
        height: '64%',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: '#808080'
    },
    linkText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#1E90FF',
    },
    row: {
        flexDirection: "row",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#2ba176",
        padding: 10,
        width: 270,
        height: 37
    },
});

export default Agreement;
