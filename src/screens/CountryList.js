/* eslint-disable prettier/prettier */
import React, { useMemo, useState, useEffect, Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Feather';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, Appbar } from 'react-native-paper';
import countryData from '../model/country_dial_info.json';

export default class CountryHeader extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    const data = countryData;
    this.state = {
      countries: data,
      listHeader: false,
      search: null,
      loading: false
    };
  }
  componentDidMount() {
    //this.renderHeader();
  }
  componentDidUpdate() {
    //alert(JSON.stringify(this.state.search));
  }
  handleChange = (text) => {
    this.setState({ search: text })
    //var text = this.state.search
    var cData = countryData
    var regEx = new RegExp(text, "i");
    var filteredData = cData.filter(e => e.name.match(regEx))
    if (filteredData.length > 0) {
      this.setState({ countries: filteredData });
    } else {
      if (text !== null && text !== '') {
        this.setState({ countries: [] });
      } else {
        this.setState({ countries: cData });
      }
    }
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#f5f5f5',
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16, backgroundColor: '#fff' }}>
          {this.state.listHeader == true &&
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BackIcon
                onPress={() => this.navigation.navigate('SignIn')}
                style={{ fontSize: 22, color: 'grey' }}
                name="arrow-left"></BackIcon>
              <TextInput
                value={this.state.search}
                mode="flat"
                placeholder="Search countries"
                onChangeText={(text) => this.handleChange(text)}
                //returnKeyType={'done'}
                //blurOnSubmit={true}
                //onSubmitEditing={() => this.handleChange()}
                selectionColor={'black'}
                activeUnderlineColor={'transparent'}
                outlineColor={'transparent'}
                underlineColor={'transparent'}
                activeOutlineColor={'transparent'}
                style={{
                  width: 240,
                  backgroundColor: '#fff',
                  textAlign: 'left',
                  fontSize: 18,
                  height: 20,
                }}
                theme={{ colors: { primary: 'transparent' } }}
              />
              <CloseIcon
                onPress={() =>
                  this.setState({ search: '', listHeader: false, countries: countryData })
                }
                style={{ fontSize: 20, color: 'grey', marginStart: 70 }}
                name="close"></CloseIcon>
            </View>
          }
          {this.state.listHeader == false &&
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BackIcon
                onPress={() => this.navigation.navigate('SignIn')}
                style={{ fontSize: 22, color: 'grey' }}
                name="arrow-left"></BackIcon>
              <Text style={{ fontSize: 18, paddingStart: 12, color: '#2ba176', fontWeight: 'bold' }}>
                Choose a country
              </Text>
              <SearchIcon
                onPress={() => this.setState({ listHeader: true })}
                style={{
                  fontSize: 22,
                  color: 'grey',
                  marginStart: 160,
                }}
                name="search"></SearchIcon>
            </View>
          }
        </View>
        <FlatList
          refreshing={this.state.loading}
          data={this.state.countries}
          //stickyHeaderIndices={[0]}
          //ListHeaderComponent={() => this.listHeader(this.state.listHeader)}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponentStyle={{
            padding: 15,
            backgroundColor: '#fff',
          }}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingBottom: 15,
                paddingTop: 15,
                paddingStart: 12,
                paddingEnd: 25,
                justifyContent: 'space-between',
              }}>
              <Pressable style={{ width: '100%', flexDirection: 'row' }} onPress={() => {
                this.props.navigation.navigate('SignIn', { selObj: item })
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Text}>{item.flag}</Text>
                  <View style={{ width: '75%' }}>
                    <Text style={styles.Text2}>{item.name}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <Text style={styles.Text3}>{item.dial_code}</Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 12,
    color: 'black',
  },
  Text2: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 12,
    color: 'black',
  },
  Text3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'right'
  },
});
