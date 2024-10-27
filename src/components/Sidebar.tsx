import { Button } from "@/components/ui/button"
import { MessageCircle, User, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  
  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
      <nav className="p-4 space-y-2 flex-grow">
        <Link to="/chat">
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-xl hover:bg-gray-200 ${location.pathname === '/chat' ? 'bg-gray-300' : ''} button-transition`}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Чат
          </Button>
        </Link>
      </nav>
      <div className="border-t border-gray-200 my-2"></div>
      <div className="p-4 space-y-2">
        <Link to="/profile">
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-xl hover:bg-gray-200 ${location.pathname === '/profile' ? 'bg-gray-300' : ''} button-transition`}
          >
            <User className="mr-2 h-4 w-4" />
            Профиль
          </Button>
        </Link>
        <Link to="/logout">
          <Button
            variant="ghost"
            className={`w-full justify-start rounded-xl hover:bg-gray-200 ${location.pathname === '/logout' ? 'bg-gray-300' : ''} button-transition`}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выход
          </Button>
        </Link>
      </div>
    </aside>
  )
}
