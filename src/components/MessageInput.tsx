import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendHorizonal } from 'lucide-react'

type MessageInputProps = {
  inputMessage: string
  setInputMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
}

export default function MessageInput({ inputMessage, setInputMessage, handleSendMessage }: MessageInputProps) {
  return (
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
  )
}