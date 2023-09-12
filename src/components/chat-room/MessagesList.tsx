import Message from './Message';

type Props = {
  messages: Message[] | undefined;
};

function MessagesList({ messages }: Props) {
  return (
    <div className="flex-1 space-y-3 p-4 overflow-scroll">
      {messages?.map((message) => (
        <Message message={message} />
      ))}
    </div>
  );
}

export default MessagesList;
