import type { TextMessageEntity } from "@/types"

type TextMessageEntityProps = {
  entity: TextMessageEntity;
}

export default function TextMessageEntity({ entity }: TextMessageEntityProps) {
  return (
    <p>{entity.text}</p>
  )
}