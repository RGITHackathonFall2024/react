import { Button } from "@/components/ui/button"
import type { MessageEntity } from "@/types"
import ButtonMessageEntity from "./entities/ButtonMessageEntity";
import TextMessageEntity from "./entities/TextMessageEntity";

type MessageEntityProps = {
    entity: MessageEntity;
}

export default function MessageEntity({ entity }: MessageEntityProps) {
    const ent = () => {
        switch (entity.type) {
            case "text":  return <TextMessageEntity entity={entity} />;
            case "button_url": return  <ButtonMessageEntity entity={entity} />;
        }
    }
    return (
        <>
        {ent()}
        </>
    )
}