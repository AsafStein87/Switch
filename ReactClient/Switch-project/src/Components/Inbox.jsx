import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database, auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Btn from '../Elements/Btn';
import Chat from './Chat';
import '../StyleSheets/Inbox.css';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [factoryCode, setFactoryCode] = useState(null);
  const [isChatOpen, setChatOpen] = useState(null);
  const [fromClicked, setFrom] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const myFactoryCode = localStorage.getItem('FactoryCode');
        console.log("Factory code from localStorage:", myFactoryCode);
        if (myFactoryCode) {
          setFactoryCode(myFactoryCode);
        }
        } else {
        // signInAnonymously(auth).catch(error => {
        //   console.error("Anonymous sign-in error: ", error);
        // });
      }
    });

    return () => unsubscribe();
  }, []); // Depend on offerId to refetch messages when offerId changes

  useEffect(() => {
    if (factoryCode) {
      fetchMessages(factoryCode);
    }
  }, [factoryCode]);

  const closeChat = () => {
    setChatOpen(null);
  };

  const setChatOpe2n = (offedId, from) => {
    setChatOpen(offedId)
    setFrom(from);
  }

  const fetchMessages = (myFactoryCode) => {
    console.log("Fetching messages for Factory Address:", myFactoryCode);
    const messagesRef = ref(database, `chats/`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Raw Data from Firebase:", data);
      const relevantMessages = [];

      for (let offerId in data) {
        for (let messageKey in data[offerId]) {
          const message = data[offerId][messageKey];
          console.log("Processing message:", message);
          if (message.to === Number(myFactoryCode)) {
            relevantMessages.push({
              offerId: offerId,
              ...message,
              key: messageKey,
            });
          }
        }
      }

      console.log("Relevant Messages:", relevantMessages);
      setMessages(relevantMessages);
    }, (error) => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <div className="inbox-container">
      <h2 className="header">הודעות נכנסות</h2>
      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="message-card">
              <div className="message-content">
                <p><strong>ממפעל:</strong> {message.fromName ?? message.from}</p>
                <p><strong>הודעה:</strong> {message.text}</p>
                <p><strong>נשלח בתאריך:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                <Btn size="small" onClick={() => setChatOpe2n(message.offerId, message.from)}>שלח הודעה</Btn>
              </div>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>

      {isChatOpen !== null && (
        <Chat offerId={isChatOpen} factoryCodeGiven={fromClicked} closeChat={closeChat} offerSender={false} from={fromClicked} />
      )}
    </div>
  );
};

export default Inbox;