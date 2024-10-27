import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const { isLoggedIn, user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [university, setUniversity] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
    setName(user!.username);
    setCity(user!.home_town);
    setUniversity(user!.university);
  }, []);
  return (
    <div className="mx-10">
      <h2 className="text-2xl font-bold mb-6 mt-10">Профиль</h2>
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Введите ваше имя" className="w-full bg-gray-100 border-none placeholder:text-gray-400" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Домашний город</label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} id="city" placeholder="Введите ваш город" className="w-full bg-gray-100 border-none placeholder:text-gray-400" />
        </div>
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">ВУЗ</label>
          <Input value={university} onChange={(e) => setUniversity(e.target.value)} id="university" placeholder="Введите ваш вуз" className="w-full bg-gray-100 border-none placeholder:text-gray-400" />
        </div>
        <Button className="bg-gray-800 text-white hover:bg-gray-700" onClick={() => {
          updateUser({
            home_town: city,
            university: university,
            username: name
          }).then(() => {
            console.log("OK");
            navigate("/")
          }).catch(console.error);
        }}>Сохранить</Button>
      </div>
    </div>
  )
}