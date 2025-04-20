'use server';

import { cookies } from 'next/headers';

export const setCookies = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
};
