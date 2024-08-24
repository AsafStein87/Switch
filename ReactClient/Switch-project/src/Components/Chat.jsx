import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { database, auth } from './Firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import '../StyleSheets/Chat.css';

const Chat = ({ offerId, factoryCodeGiven, closeChat, offerSender, from }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  // const [sendTofactoryCode, setFactoryCode] = useState(0);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // await getFactoryCodeByAddress(factoryAddress);        
      } else {
        signInAnonymously(auth).catch(error => {
          console.error("Anonymous sign-in error: ", error);
        });
      }
    });

    return () => unsubscribe();
  }, [offerId]); // Depend on offerId to refetch messages when offerId changes

  useEffect(() => {
    if (factoryCodeGiven !== null) {
      fetchMessages(); // Fetch messages after factory code is set
    }
  }, [factoryCodeGiven]); // Depend on sendTofactoryCode

  const checkIfChatBetweenThem = (data, from, to) => {
    return (data['from'] == from) && (data['to'] == to);
  }

  const fetchMessages = () => {
        // Use the offerId to get messages for the specific offer
        const messagesRef = ref(database, `chats/${offerId}`);
        onValue(messagesRef, (snapshot) => {
          const data = snapshot.val();
          const loadedMessages = [];
          
          const myFactoryCode = Number(localStorage.getItem('FactoryCode'));
          for (let key in data) {
            if (offerSender) {
              if (checkIfChatBetweenThem(data[key], myFactoryCode, factoryCodeGiven) || 
              checkIfChatBetweenThem(data[key], factoryCodeGiven, myFactoryCode) || 
              data[key]["to"] == myFactoryCode) {
              loadedMessages.push({ key, ...data[key] });
              }
            } else {
              if (data[key]["to"] == myFactoryCode && data[key]["from"] == from ||
                data[key]["to"] == from && data[key]["from"] == myFactoryCode
              ) {
                loadedMessages.push({ key, ...data[key] });
              }
            }
          }
          setMessages(loadedMessages);
        }, (error) => {
          console.error('Error fetching data:', error);
        });

  }

  const handleSendMessage = () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    if (newMessage.trim() === '') return;

    const myFactoryCode = localStorage.getItem('FactoryCode');

    const messagesRef = ref(database, `chats/${offerId}`); // Reference messages for the specific offerId
    const message = {
      text: newMessage,
      timestamp: new Date().toISOString(),
      uid: user.uid, // Include user ID for reference
      to: factoryCodeGiven,
      from: Number(myFactoryCode),
      fromName: localStorage.getItem('factoryName')
    };

    push(messagesRef, message)
      .then(() => {
        setNewMessage('');
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  // const getFactoryCodeByAddress  = (factoryAddress) => {
  //   if (sendTofactoryCode != 0) {
  //     return;
  //   }

  //   const requestOptions = {
  //     method: "GET",
  //   };
  
  //   fetch("http://localhost:5116/api/Factory/GetFactoryCode/"+factoryAddress, requestOptions)
  //   .then(response => response.text()) // Get response as text
  //   .then(data => {
  //     const sendTofactoryCode = Number(data); // Convert the text to a number
  //     if (!isNaN(sendTofactoryCode)) { // Check if the result is a valid number
  //       setFactoryCode(sendTofactoryCode);
  //     } else {
  //       console.error("Invalid factory code received:", data);
  //     }
  //   })
  //   .catch(error => console.error("Error fetching factory code:", error));
  // }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
        <button onClick={closeChat}>סגור</button>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.key} className="chat-message">
            <p>{message.text}</p>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="כתוב הודעה"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
