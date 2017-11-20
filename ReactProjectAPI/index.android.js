
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  AlertIOS,
  Text,
  View
} from 'react-native';

export default class ReactProjectAPI extends Component {


  constructor(props){
    super(props);
    this.state = {
        rovers: [],
        msg : []
    }

    this._onPressButtonGet = this._onPressButtonGet.bind(this)
    this._onPressButtonPost = this._onPressButtonPost.bind(this)
  }


  _onPressButtonGet(){

    fetch("http://192.168.0.106:3000/test?search=nraboy", {"method": "GET"})
    .then((response) => response.json())
    .then((responseData) => {
        AlertIOS.alert(
            "GET Response",
            "Search Query ->"+responseData.search
          );
    }).done();

  }

  _onPressButtonPost(){

    fetch("http://192.168.0.106:3000/test", {"method": "POST", body : JSON.stringify({username : "nraboy", firstname : "Nic", lastname : "Raboy"})})
    .then((response) => response.json())
    .then((responseData) => {
        AlertIOS.alert(
            "POST Response",
            "Response Body ->"+JSON.stringify(responseData.body)
          );
    })
    .done();
  }

  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
          
        <TouchableOpacity style={[styles.btn, { marginBottom: 20,}]} onPress={ this._onPressButtonGet}> 
                  <Text style={styles.btnText}>Get</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { marginBottom: 20,}]} onPress={ this._onPressButtonPost}> 
                  <Text style={styles.btnText}>Post</Text>
        </TouchableOpacity>


      </View>
    );
  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactProjectAPI', () => ReactProjectAPI);
