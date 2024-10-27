import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react'

type CategoryCardProps = {
  title: string
  icon: LucideIcon
  questions: string[]
}

export default function CategoryCard({ title, icon: Icon, questions }: CategoryCardProps) {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-4">
          <Icon className="h-12 w-12 text-gray-600" />
          <h2 className="text-xl font-semibold mt-2">{title}</h2>
        </div>
        <ul className="space-y-2">
          {questions.map((question, index) => (
            <li key={index} className="text-sm text-gray-600">{question}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
