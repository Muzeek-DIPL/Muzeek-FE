import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { outputBotReply } from "../utils/chatbot";
import styles from "./ChatWindow.module.css";

function ChatBubble({ sender, message }) {
  return (
    <div
      className={
        "py-3 px-4 text-wrap " +
        (sender === "bot"
          ? `me-auto ${styles.chatBubbleBot}`
          : `ms-auto bg-primary ${styles.chatBubbleSender}`)
      }
    >
      <p className={"m-0 text-break " + (sender === "bot" ? "" : "text-white")}>
        {message}
      </p>
    </div>
  );
}

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message:
        "Halo! sampaikan pertanyaan kamu disini, akan aku jawab sebisaku!",
    },
  ]);
  const messagesEndRef = useRef(null);

  const onSend = () => {
    if (message.length > 0) {
      const newMessages = [...messages, { sender: "me", message }];
      setMessages(newMessages);

      setTimeout(() => {
        outputBotReply(message).then((response) => {
          setMessages([...newMessages, { sender: "bot", message: response }]);
        });
      }, 300);
    }
    setMessage("");
  };

  const onChange = (e) => {
    if (e.nativeEvent.inputType === "insertLineBreak") {
      onSend();
    } else {
      setMessage(e.target.value);
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="position-fixed"
      style={{
        right: 30,
        zIndex: 10,

        ...(isOpen ? { bottom: 30 } : { bottom: 100 }),
      }}
    >
      {!isOpen ? (
        <Button
          variant="primary"
          className="rounded-circle"
          style={{ width: "50px", height: "50px" }}
          onClick={() => setIsOpen(true)}
        >
          <Icon icon="teenyicons:chatbot-solid" width={25} />
        </Button>
      ) : (
        <div className="d-flex flex-column rounded-2 shadow">
          <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-primary border-bottom border-light rounded-top">
            <div className="d-flex align-items-center gap-1">
              <Icon icon="fluent:bot-20-filled" color="white" width={25} />
              <h6 className="text-white m-0">MuzeekBot</h6>
            </div>
            <Icon
              icon="eva:close-circle-fill"
              className="text-white"
              width={30}
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div
            className="d-flex flex-column gap-4 bg-white py-3 px-2 overflow-auto"
            style={{
              height: "300px",
              width: "320px",
              scrollBehavior: "smooth",
            }}
          >
            {messages.map((v, i) => (
              <ChatBubble key={i} message={v.message} sender={v.sender} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="d-flex justify-content-between align-items-start bg-white py-2 px-3 shadow rounded-bottom">
            <TextareaAutosize
              minRows={1}
              type="textarea"
              placeholder="Tanyakan sesuatu"
              className="rounded-3 shadow-0 border-0 py-2 px-3"
              style={{
                outline: "none",
                resize: "none",
                backgroundColor: "#e4e8ed",
                width: "245px",
              }}
              value={message}
              onChange={onChange}
            />
            <Icon
              icon="fluent:send-20-filled"
              width={25}
              className="text-primary mt-2"
              style={{ cursor: "pointer" }}
              onClick={onSend}
            />
          </div>
        </div>
      )}
    </div>
  );
}
