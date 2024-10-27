import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

export default function LogoutPage() {
  const navigate = useNavigate()

  const handleLogout = (confirm: boolean) => {
    if (confirm) {
      // Handle logout logic here
      console.log("Logged out")
    }
    navigate('/chat')
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-6">Вы уверены что хотите выйти?</h2>
        <div className="space-x-4">
          <Button onClick={() => handleLogout(true)} className="bg-red-600 text-white hover:bg-red-500">Да</Button>
          <Button onClick={() => handleLogout(false)} className="bg-gray-600 text-white hover:bg-gray-500">Отмена</Button>
        </div>
      </div>
    </div>
  )
}