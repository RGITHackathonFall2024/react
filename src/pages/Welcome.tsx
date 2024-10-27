import { Building, Home, Briefcase } from 'lucide-react'
import CategoryCard from '../components/CategoryCard'
import { LoginButton } from '@telegram-auth/react';
import { useAuth } from '@/lib/auth/index';
import MessageInput from '@/components/MessageInput';
type WelcomeProps = {
  handleSendMessage: (e: React.FormEvent) => void
  inputMessage: string
  setInputMessage: (message: string) => void
}

export default function Welcome({ handleSendMessage, inputMessage, setInputMessage }: WelcomeProps) {
  const { login, isLoggedIn } = useAuth();
  const categories = [
    {
      title: 'Вуз',
      icon: Building,
      questions: [
        'Как мне посмотреть расписание занятий на этой неделе?',
        'Где я могу найти ведомости за последний семестр?',
        'Могу ли я узнать результаты экзаменов через систему вуза?'
      ]
    },
    {
      title: 'Потребности',
      icon: Home,
      questions: [
        'Какие варианты аренды жилья рядом с моим университетом?',
        'Найди билеты на поезд до Москвы на ближайшие выходные.',
        'Помоги выбрать жилье в пределах моего бюджета.'
      ]
    },
    {
      title: 'Работа',
      icon: Briefcase,
      questions: [
        'В каких компаниях я могу пройти стажировку?',
        'Какие доступные вакансии есть в моей области знаний?',
        'Компании со стажировками и дальнейшим трудоустройством.'
      ]
    }
  ]

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h1 className="text-3xl font-bold mb-8">Помощник студента</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
        {isLoggedIn ? <div className="w-full max-w-4xl mt-8">
          <MessageInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
          />
        </div> : <div className="w-full max-w-4xl mt-8 flex justify-center">
          <LoginButton
            botUsername={"iron_student_bot"}
            buttonSize="large" // "large" | "medium" | "small"
            cornerRadius={0} // 0 - 20
            showAvatar={true} // true | false
            requestAccess={"write"}
            lang="ru"
            onAuthCallback={(data) => {
              login(data);

            }}
          />
        </div>}

      </div>
    </div>
  )
}