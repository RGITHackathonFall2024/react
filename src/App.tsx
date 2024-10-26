'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, User, LogOut, Building, Home, Briefcase, SendHorizonal } from 'lucide-react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import './App.css' // Import the CSS file for transitions

type Message = {
  role: string;
  content: string;
}

export default function StudentAssistant() {
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, { role: 'user', content: inputMessage }])
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'тестовый ответ от нейронки' }])
      setInputMessage('')
      scrollAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollAreaRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleLogoutConfirm = (confirm: boolean) => {
    if (confirm) {
      // Handle logout logic here
      console.log("Logged out")
    }
    setShowLogoutConfirm(false)
    setActiveTab('chat')
  }
  const renderMainContent = () => (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h1 className="text-3xl font-bold mb-8">Помощник студента</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {[
            {
              title: 'Вуз', icon: Building, questions: [
                'Как мне посмотреть расписание занятий на этой неделе?',
                'Где я могу найти ведомости за последний семестр?',
                'Могу ли я узнать результаты экзаменов через систему вуза?'
              ]
            },
            {
              title: 'Потребности', icon: Home, questions: [
                'Какие варианты аренды жилья рядом с моим университетом?',
                'Найди билеты на поезд до Москвы на ближайшие выходные.',
                'Помоги выбрать жилье в пределах моего бюджета.'
              ]
            },
            {
              title: 'Работа', icon: Briefcase, questions: [
                'В каких компаниях я могу пройти стажировку?',
                'Какие доступные вакансии есть в моей области знаний?',
                'Компании со стажировками и дальнейшим трудоустройством.'
              ]
            }
          ].map((category, index) => (
            <Card key={index} className="bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-4">
                  {<category.icon className="h-12 w-12 text-gray-600" />}
                  <h2 className="text-xl font-semibold mt-2">{category.title}</h2>
                </div>
                <ul className="space-y-2">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex} className="text-sm text-gray-600">{question}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-full max-w-4xl mt-8">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Введите ваше сообщение..."
              className="flex-1 rounded-none rounded-l-xl border-0 bg-gray-100 placeholder:text-gray-400"
            />
            <Button
              type="submit"
              className={`send-button rounded-none rounded-r-xl ${inputMessage ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} `}
            >
              <SendHorizonal className="h-5 w-5" />
              <span className="sr-only">Отправить</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )

  const renderChatContent = () => (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <TransitionGroup className="space-y-4">
          {messages.map((message, index) => (
            <CSSTransition
              key={index}
              timeout={300}
              classNames="message"
            >
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <img
                    src="https://uploads.dailydot.com/2024/07/side-eye-cat.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                  />
                )}
                <div className={`message-bubble ${message.role}`}>
                  {message.content}
                </div>
                
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <div className="flex-1 p-4" ref={scrollAreaRef}>
        </div>
      </ScrollArea>
                <div className="p-4">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Введите ваше сообщение..."
                className="flex-1 rounded-none rounded-l-xl border-0 bg-gray-100 placeholder:text-gray-400"
              />
              <Button
                type="submit"
                className={`send-button rounded-none rounded-r-xl ${inputMessage ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} `}
              >
                <SendHorizonal className="h-5 w-5" />
                <span className="sr-only">Отправить</span>
              </Button>
            </form>
          </div>
    </div>
  )

  const renderProfileContent = () => (
    <div className=" mx-auto mx-10 w-1/2">
        <h2 className="text-2xl font-bold mb-6 mt-10">Профиль</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
            <Input id="name" placeholder="Введите ваше имя" className="w-full bg-gray-100 border-none placeholder:text-gray-400" />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Домашний город</label>
            <Input id="city" placeholder="Введите ваш город" className="w-full bg-gray-100 border-none placeholder:text-gray-400" />
          </div>
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">ВУЗ</label>
            <Input id="university" placeholder="Введите ваш вуз" className="w-full bg-gray-100 border-none placeholder:text-gray-400" />
          </div>
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">Профессия</label>
            <Input id="profession" placeholder="Введите вашу профессию" className="w-full bg-gray-100 border-none placeholder:text-gray-400" />
          </div>
          <Button type="submit" className="bg-gray-800 text-white hover:bg-gray-700">Сохранить</Button>
        </form>
    </div>
  )

  const renderLogoutContent = () => (
    <div className="w-full h-full flex flex-col justify-center items-center">
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-6">Вы уверены что хотите выйти?</h2>
      <div className="space-x-4">
        <Button onClick={() => handleLogoutConfirm(true)} className="bg-red-600 text-white hover:bg-red-500">Да</Button>
        <Button onClick={() => handleLogoutConfirm(false)} className="bg-gray-600 text-white hover:bg-gray-500">Отмена</Button>
      </div>
    </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-white">
      <aside className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
        <nav className="p-4 space-y-2 flex-grow">
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-xl hover:bg-gray-200 ${activeTab === 'chat' ? 'bg-gray-300' : ''} button-transition`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Чат
          </Button>
        </nav>
        <div className="border-t border-gray-200 my-2"></div> {/* Separator */}
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-xl hover:bg-gray-200 ${activeTab === 'profile' ? 'bg-gray-300' : ''} button-transition`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="mr-2 h-4 w-4" />
            Профиль
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-xl hover:bg-gray-200 ${activeTab === 'logout' ? 'bg-gray-300' : ''} button-transition`}
            onClick={() => {
              setActiveTab('logout')
              setShowLogoutConfirm(true)
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выход
          </Button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        {/* <TransitionGroup className="flex-1 flex flex-col justify-center items-center overflow-auto w-full h-full flex flex-col justify-center items-center">
          <CSSTransition
            key={activeTab}
            timeout={0}
            classNames="fade"
          > */}
              {activeTab === 'main' && renderMainContent()}
              {activeTab === 'chat' && (
                <>
                  {messages.length === 0 && renderMainContent()}
                  {messages.length != 0 && renderChatContent()}
                </>
              )}
              {activeTab === 'profile' && renderProfileContent()}
              {activeTab === 'logout' && showLogoutConfirm && renderLogoutContent()}
          {/* </CSSTransition>
        </TransitionGroup> */}
      </main>
    </div>
  )
}