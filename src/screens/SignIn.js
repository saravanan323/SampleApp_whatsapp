/* eslint-disable prettier/prettier */
import React, { useState, useRef, Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Button, TextInput } from 'react-native-paper';

import countryData from '../model/country_dial_info.json';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.route = props.route;
    this.state = {
      phoneNumber: '',
      visible: false,
      country: 'Choose a country',
      dialCode: '',
      submit: false,
      isFocus: false
    }
  };
  componentDidMount() {
    //
    this.props.navigation.addListener('focus', () => {
      this.firstInput.focus();
      if (this.props.route.params !== undefined) {
        var selObj = this.props.route.params.selObj
        this.setState({ country: selObj.name, dialCode: selObj.dial_code.substr(1) })
      }
    })
  }
  componentWillUnmount() {
    //
  }
  componentDidUpdate() {
    //
  }
  hideMenu = () => { this.setState({ visible: false }) };
  showMenu = () => { this.setState({ visible: true }) };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.justifyTitle}>
              <Text style={styles.title}>Enter your phone number</Text>
              <View
                style={{
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Menu
                  visible={this.state.visible}
                  animationDuration={500}
                  style={{ top: 5, height: 50, borderRadius: 0 }}
                  anchor={
                    <TouchableOpacity onPress={() => this.showMenu()}>
                      <SimpleLineIcon
                        style={{ color: 'grey' }}
                        name="options-vertical"
                        size={15}
                        color="black"
                      />
                    </TouchableOpacity>
                  }
                  onRequestClose={() => this.hideMenu()}>
                  <MenuItem textStyle={{ color: 'grey', fontSize: 15 }}>Help</MenuItem>
                </Menu>
              </View>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.row}>
              <Text style={styles.text}>
                WhatsApp will need to verify your phone number.{' '}
              </Text>
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('http://google.com')}>
                What's
              </Text>
            </View>
            <View>
              <Text
                style={styles.linkText}
                onPress={() => Linking.openURL('http://google.com')}>
                my number?
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginHorizontal: 50, paddingTop: 10 }}>
              <Pressable onPress={() => this.navigation.navigate('Country')}>
                <TextInput
                  value={this.state.country}
                  dense={true}
                  mode="flat"
                  editable={false}
                  selectionColor={'#4E9F3D'}
                  activeUnderlineColor={'#4E9F3D'}
                  outlineColor={'#4E9F3D'}
                  underlineColor={'#4E9F3D'}
                  activeOutlineColor={'#4E9F3D'}
                  style={{ width: 250, backgroundColor: '#fff', textAlign: 'center' }}
                  right={
                    <TextInput.Icon name="menu-down" size={25} color="#4E9F3D" style={{ paddingStart: 18 }} />
                  }
                  theme={{ colors: { primary: '#4E9F3D' } }}
                />
              </Pressable >
              <View style={styles.row2}>
                <TextInput
                  value={this.state.dialCode}
                  left={<TextInput.Affix text="+" textStyle={{ right: 11 }} />}
                  mode="flat"
                  ref={(input) => this.firstInput = input}
                  dense={true}
                  editable={true}
                  onSubmitEditing={() => this.secondInput.focus()}
                  blurOnSubmit={this.state.submit}
                  keyboardType={'numeric'}
                  returnKeyType={'next'}
                  selectionColor={'#4E9F3D'}
                  activeUnderlineColor={'#4E9F3D'}
                  outlineColor={'#4E9F3D'}
                  underlineColor={'#4E9F3D'}
                  activeOutlineColor={'#4E9F3D'}
                  style={{ width: 70, marginRight: 10, backgroundColor: '#fff', textAlign: 'center' }}
                  theme={{ colors: { primary: '#4E9F3D' } }}
                  onChangeText={(text) => {
                    this.setState({ dialCode: text })
                    let countries = [...countryData]
                    if (text !== undefined && text !== '') {
                      let selCountry = countries.find(e => e.dial_code == '+' + text)
                      selCountry !== undefined ? this.setState({ country: selCountry.name, submit: true }) : this.setState({ country: 'invalid country code' });
                      if (selCountry !== undefined) {
                        this.secondInput.focus()
                      }
                    } else {
                      this.setState({ country: 'Choose a country' });
                    }

                  }}
                />
                <TextInput
                  value={this.state.phoneNumber}
                  ref={ref => {
                    this.secondInput = ref;
                  }}
                  mode="flat"
                  placeholder="phone number"
                  dense={true}
                  editable={true}
                  keyboardType={'numeric'}
                  selectionColor={'#4E9F3D'}
                  activeUnderlineColor={'#4E9F3D'}
                  outlineColor={'#4E9F3D'}
                  underlineColor={'#4E9F3D'}
                  activeOutlineColor={'#4E9F3D'}
                  style={{ width: 170, backgroundColor: '#fff' }}
                  onChangeText={text => this.setState({ phoneNumber: text })}
                  theme={{ colors: { primary: '#4E9F3D' } }}
                />
              </View>
              <Text style={{ paddingTop: 10 }}>Carrier charges may apply</Text>
            </View>
          </View>
          <KeyboardAvoidingView enabled={true} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: "flex-end", alignItems: 'center', paddingBottom: 40, width: '100%' }}>
            <Button mode="contained" style={{ paddingStart: 4, paddingEnd: 4, backgroundColor: '#2ba176', }}>Next</Button>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    bottom: 0,
  },
  justifyTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ba176',
    fontFamily: 'helvetica',
    textAlign: 'center',
    bottom: 5,
    right: 60,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: '#808080',
  },
  linkText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#1E90FF',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2ba176',
    padding: 10,
    width: 270,
    height: 37,
  },
  phoneContainer: {
    width: '90%',
    height: 50,
  },
  button2: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textInput: {
    paddingVertical: 0,
  },
  menuContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backdrop: {},
  menuOptions: {
    padding: 50,
  },
  menuTrigger: {
    padding: 5,
  },
  triggerText: {
    fontSize: 20,
  },
  contentText: {
    fontSize: 18,
  },
});
