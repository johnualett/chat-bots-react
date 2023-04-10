import React , { useState } from "react";
import './index.css'
import { AiOutlineWechat } from 'react-icons/ai'

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
    setMessages((prevMessages) => [...prevMessages, inputValue]);
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
            {messages.map((message, index) => (
              <div key={index} className="messages__item messages__item--operator">
                {message}
              </div>
            ))}
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
