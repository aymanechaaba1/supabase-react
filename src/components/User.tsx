import { User } from '@supabase/supabase-js';

type Props = {
  user: User;
};

function User({ user }: Props) {
  console.log(user);

  return (
    <div>
      <img
        src={user?.user_metadata?.avatar_url}
        alt={user?.user_metadata?.full_name}
        className="w-10 h-10 object-cover rounded-full"
      />
    </div>
  );
}

export default User;
