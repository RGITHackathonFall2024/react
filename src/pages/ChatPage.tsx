import { useState, useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import MessageInput from '../components/MessageInput'
import Welcome from './Welcome'
import { Message } from '../types'
import "../assets/Chat.css"
import LoadingEllipsis from '@/components/LoadingEllipsis'
import MessageEntity from '@/components/MessageEntity'
import IronHand from "@/assets/IronHand.webp";
import { socket } from '@/lib/api/socket'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setInputMessage('')
      sendMessage(inputMessage)
    }
  }

  useEffect(() => {
    scrollAreaRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  function sendMessage(text: string) {
    socket.emit("message", text);
    setLoading(true);
  }

  useEffect(() => {
    socket.on("new_message", (message: any) => {
      if (message.role === "assistant") setLoading(false);
      setMessages(m => m.concat([{ role: message.role, content: JSON.parse(message.content) }]))
    })

  }, [])
  if (messages.length === 0) {
    return <Welcome handleSendMessage={handleSendMessage} inputMessage={inputMessage} setInputMessage={setInputMessage} />
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <TransitionGroup className="space-y-4">
          {messages.map((message, index) => (
            <CSSTransition key={index} timeout={300} classNames="message">
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <img
                    src={IronHand}
                    alt="Profile"
                    className="w-9 h-9 rounded-full mr-2 flex-shrink-0"
                  />
                )}
                <div className={`message-bubble ${message.role}`}>
                  {message.content.response.map(entity => (<MessageEntity entity={entity} />))}
                </div>
              </div>
            </CSSTransition>
          ))}
          {loading && <CSSTransition key={'loading'} timeout={300} classNames="message">
            <div className={`flex justify-start`}>
              <img
                src={IronHand}
                alt="Profile"
                className="w-9 h-9 rounded-full mr-2 flex-shrink-0"
              />

              <div className={`message-bubble assistant`}>
                <LoadingEllipsis />
              </div>
            </div>
          </CSSTransition>}

        </TransitionGroup>
        <div ref={scrollAreaRef} />
      </ScrollArea>
      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  )
}