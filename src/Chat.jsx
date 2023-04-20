import React , { useEffect, useState, useRef } from "react";
import './index.css'
import { AiOutlineWechat } from 'react-icons/ai'
import axios from "axios";
const API_URL = "http://127.0.0.1:4040/chat"


export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleChatbox = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages((prevMessages) => [ inputValue,...prevMessages]);
    (async() => {
      try {
        const { data: { response }} = await axios.post(API_URL, {
          question: inputValue
        })
        setMessages((prevMessages) => [response,...prevMessages])
        console.log(response.split(":")[0] === 'Veronica',response.split(":")[0])
      }
      catch (e) {
        console.log(e)
      }
    })()
    setInputValue("");
  };

  return ( 
    <>
      <div className="chatbox">
        <div className={`chatbox__support ${isOpen ? "chatbox--active" : ""}`}>
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                alt="image"
              />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chat Ualett support</h4>
              <p className="chatbox__description--header">
                Hi. My name is Verónica. How can I help you?
              </p>
            </div>
          </div>
          <div className="chatbox__messages">
            {messages.map((message = '', index) => 
              (<div key={index} className={`messages__item messages__item--operator ${message.split(":")[0] === 'Veronica' ? ' messages__item--bot': ' messages__item--my'}`}>
                  {message.split(":")[0] === 'Veronica' ? message.split(":")[1]  : message}
                </div>)
            )}
          </div>
          <div className="chatbox__footer">
            <input
              type="text"
              placeholder="Write a message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="chatbox__send--footer send__button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="chatbox__button">
          <button onClick={toggleChatbox}>
          <AiOutlineWechat style={{
            fontSize: '2rem',
            color: '#0d348a',
            
          }}/>
          </button>
        </div>
        </>
  );
}
