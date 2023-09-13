import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

type Props = {
  message: Message;
};

function Message({ message }: Props) {
  // @ts-ignore
  const { user } = useContext(AuthContext);
  if (!user) return;

  // current user
  const isUser = message.user_id === user.id;

  return (
    <div className={`flex ${isUser && 'flex-row-reverse'} items-center gap-3`}>
      {user?.user_metadata?.avatar_url && (
        <img
          src={user?.user_metadata.avatar_url}
          alt=""
          className="w-10 h-10 object-cover rounded-full"
        />
      )}
      <div className="space-y-1">
        <p className={`text-xs text-slate-600 ${isUser && 'text-right'}`}>
          {new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(message.created_at!))}
        </p>
        <h1
          className={`bg-${
            isUser ? 'blue' : 'red'
          }-400 rounded-md px-2 py-1 text-slate-100`}
        >
          {message.content}
        </h1>
      </div>
    </div>
  );
}

export default Message;
