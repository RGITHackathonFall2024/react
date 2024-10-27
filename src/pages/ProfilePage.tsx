import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  return (
    <div className="mx-10">
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
}