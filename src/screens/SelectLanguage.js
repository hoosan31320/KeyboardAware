import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import Homebar from "../components/stuff/Homebar";

function SelectLanguage({ navigation }) {
  const selectLanguage = (chosen) => {
    navigation.navigate('Filter');
  }

  const data = [
    {
      name: "German",
      img: require("../assets/flags/germany.png"),
      language: 'german'
    },
    {
      name: "Portuguese",
      img: require("../assets/flags/portugal.png"),
      language: 'portuguese'
    }, 
    {
      name: "French",
      img: require("../assets/flags/france.png"),
      language: 'french'
    }, 
    {
      name: "Spanish",
      img: require("../assets/flags/spain.png"),
      language: 'spanish'
    }, 
    {
      name: "Italian",
      img: require('../assets/flags/italy.png'),
      language: 'italian'
    }, 
    {
      name: "Dutch",
      img: require("../assets/flags/netherlands.png"),
      language: 'dutch'
    }
  ]

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.languageButton} onPress={() => {navigation.navigate('Filter', { language: item.language})}}>
        <Image
          style={{ width: 100, height: 70}}
          source={item.img}
        />
        <Text style = {styles.languageLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
              <Text style={styles.selectALanguage}>Pick a Language</Text>
          </View> 
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            numColumns={2}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 5 }}
          />
        </View>
      );
    }
  /*return (
    <View>
      <View style={styles.container}>
        <Text style={styles.selectALanguage}>Pick a Language</Text>
      </View> 
      <View style= {styles.buttonContainter}> 
        <TouchableOpacity style= {styles.languageButton} onPress={selectLanguage}>
          <Image source={require('../assets/flags/germany.png')} />
          <Text style = {styles.languageLabel}>Germany</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.languageButton} onPress={selectLanguage}>
          <Image source={require('../assets/flags/france.png')} />
          <Text style = {styles.languageLabel}>France</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.languageButton} onPress={selectLanguage}>
          <Image source={require('../assets/flags/italy.png')} />
          <Text style = {styles.languageLabel}>Italy</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.languageButton} onPress={selectLanguage}>
          <Image source={require('../assets/flags/portugal.png')} />
          <Text style = {styles.languageLabel}>Portugal</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.languageButton} onPress={selectLanguage}>
          <Image source={require('../assets/flags/spain.png')} />
          <Text style = {styles.languageLabel}>Spain</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.languageButton} onPress={selectLanguage}>
          <Image source={require('../assets/flags/netherlands.png')} />
          <Text style = {styles.languageLabel}>Netherlands</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    /*<View style={styles.container}>
      <Homebar style={styles.homebar}></Homebar>
      <Text style={styles.selectALanguage}>Select a Language</Text>
      <View style={styles.languageButtons}>
        <View style={styles.germanButtonRow}>
          <View style={styles.germanButton}>
            <View style={styles.gERButton}>
              <Text style={styles.german}>German</Text>
            </View>
          </View>
          <View style={styles.italianButton}>
            <View style={styles.iTLButton}>
              <Text style={styles.italian}>Italian</Text>
            </View>
          </View>
        </View>
        <View style={styles.frenchButtonRow}>
          <View style={styles.frenchButton}>
            <View style={styles.fRAButton}>
              <Text style={styles.french}>French</Text>
            </View>
          </View>
          <View style={styles.portugueseButton}>
            <View style={styles.pORButton}>
              <Text style={styles.portuguese}>Portuguese</Text>
            </View>
          </View>
        </View>
        <View style={styles.spanishButtonRow}>
          <View style={styles.spanishButton}>
            <View style={styles.eSPButton}>
              <Text style={styles.spanish}>Spanish</Text>
            </View>
          </View>
          <View style={styles.dutchButton}>
            <View style={styles.dUTButton}>
              <Text style={styles.dutch}>Dutch</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
} */

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: "center",
    marginBottom: "10%"
  },
  homebar: {
    width: 360,
    height: 65,
    marginTop: 675
  },
  languageButton: {
    flex: 1, 
    marginHorizontal: "5%", 
    marginBottom: "15%",
    backgroundColor: "rgba(217,240,255,1)",
    borderRadius: 44,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    width: 154,
    height: 131, 
    alignItems: "center",
    justifyContent: "center"
  },
  selectALanguage: {
    fontFamily: "OpenSans_800ExtraBold",
    color: "rgba(27,6,94,1)",
    fontSize: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  languageLabel: {
    fontFamily: "OpenSans_600SemiBold",
    color: "rgba(0,107,166,1)",
    fontSize: 24
  }
});

export default SelectLanguage;
