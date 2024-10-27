import type { ButtonMessageEntity } from "@/types"
import { Button } from "@/components/ui/button";

type ButtonMessageEntityProps = {
    entity: ButtonMessageEntity;
}

export default function ButtonMessageEntity({ entity }: ButtonMessageEntityProps) {
    return (
        <Button size={"lg"} onClick={() => window.open(entity.url, "_blank")}>{entity.text}</Button>
    )
}