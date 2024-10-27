export interface TextMessageEntity {
    type: "text";
    text: string;
}

export interface ButtonMessageEntity {
    type: "button_url";
    text: string;
    url: string;
}

export type MessageEntity = TextMessageEntity |ButtonMessageEntity;

export type Message = {
    role: string
    content: {response: MessageEntity[]}
}