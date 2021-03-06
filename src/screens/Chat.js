import React, { useState, useEffect, useContext } from 'react';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { firestore } from '../components/Firebase/method';
import { UserAuthContext } from '../navigation/UserAuthProvider';

export default function Chat({route}) {
  const [messages, setMessages] = useState([]);
  const { thread } = route.params;
  const { user } = useContext(UserAuthContext);
  const currentUser = user.toJSON();

  useEffect(() => {

  })

  async function sendMessage(messages) {
    const text = messages[0].text;

    firestore.collection('threads')
    .doc(thread._id)
    .collection('messages')
    .add({
      text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email
        }
    });

    await firestore
      .collection('threads')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );
  }

  useEffect(() => {
    const messagesListener = firestore
      .collection('threads')
      .doc(thread._id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  function renderText(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#006BA6'
          }
        }}
        textStyle={{
          right: {
            color: '#D9F0FF',
            fontFamily: 'OpenSans_400Regular'
          }
        }}
      />
    );
  }

  function loading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

  function send(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Image style = {{height: 40, width: 40 }}source={require('../assets/icons/send.png')} />
        </View>
      </Send>
    );
  }

  function scrollToBottom(props) {
    return (
      <View style={styles.bottomComponentContainer}>
        <Image source={require('../assets/icons/down.png')} />
      </View>
    );
  }

  function renderSystem(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={sendMessage}
      user={{ _id: currentUser.uid }}
      placeholder='Type your message here...'
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderText}
      renderLoading={loading}
      renderSend={send}
      scrollToBottomComponent={scrollToBottom}
      renderSystemMessage={renderSystem}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#006BA6',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
    color: '#ffffff'
  }
});