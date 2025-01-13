'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

async function createUserAction(userInfo) {
  const res = await fetch(
`    ${process.env.NEXT_PUBLIC_ROOT_URL}/api/create`,

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    },
  );
  return res;
}

export default function Login() {
  const { update, status, data } = useSession();
  const searchPerams = useSearchParams();
  const role = searchPerams.get('role') || 'user';
  const { replace } = useRouter();
  useEffect(() => {
    (async () => {
      if (data?.role) {
        replace('/');
        return;
      }
      if (role && status === 'authenticated') {
        try {
          const userInfo = {
            _id: data?._id!,
            _type: 'user',
            userName: data?.userName!,
            image: data?.iamge!,
            role,
          };

          const res = await createUserAction(userInfo);
          const data = await res.json();
          await update({
            role: data?.data?.role || 'user',
          });
        } catch (error) {}
        replace('/');
        // console.log(res);
      } else {
        replace('/');
      }
    })();
  }, [role, status, data, replace, update]);
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <h1 className='animate-pulse text-3xl font-bold dark:text-white'>
        Logging .....
      </h1>
    </div>
 
);
}
