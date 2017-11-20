import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';


const USER_ID = '@userId';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
 
    this.socket = SocketIOClient('http://192.168.0.107:3000');
    this.socket.on('new message', this.onReceivedMessage);

    this.determineUser();
  }
  
  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        
        if (!userId) {
           this.socket.emit('userJoined', null);
           this.socket.on('userJoined', (userId) => {
             AsyncStorage.setItem(USER_ID, userId);
             this.setState({ userId });
             // alert(userId);
           });
        } else {
           this.socket.emit('userJoined', userId);
           this.setState({ userId });
           // alert(userId+'else');
        }
      })
      .catch((e) => alert(e));
  }

  onReceivedMessage(messages) {

    alert(messages.user._id+' - '+this.state.userId)
      if( messages.user._id != this.state.userId )
          this._storeMessages(messages);
  }

  
  onSend(messages=[]) {
    this.socket.emit('message', messages[0]);
  //  this._storeMessages(messages);
  }

  render() {
    var user = { _id: this.state.userId || -1 };

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
      />
    );
  }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

module.exports = Main;
