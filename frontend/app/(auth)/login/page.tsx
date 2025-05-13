'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoginMutation } from '@/store/actions/user';
import { handleError } from '@/lib/functions/handle-error';
import { dashboardRoutes } from '@/lib/routes';
import { setCookies } from '@/lib/functions/set-cookies';
import { TOKEN_NAME } from '@/lib/constants';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const params = useSearchParams();

  const onSubmit = async (formData: LoginForm) => {
    try {
      const response = await login(formData).unwrap();
      await setCookies(TOKEN_NAME, response.data.token);
      const redirectTo = params.get('redirectTo');
      if (redirectTo) router.push(redirectTo);
      else router.push(dashboardRoutes.rentals.path);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 shadow-xl border border-gray-200 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
