'use client';

import { AppSidebar } from '@/components/dashboard/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { logoImage } from '@/lib/images';
import { formatMoney } from '@/lib/functions/format-number';
import { toast } from 'sonner'; // ✅ NEW

const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .min(100, 'Min amount is 100'),
  charge: yup
    .number()
    .typeError('Withdrawal must be a number')
    .required('Withdrawal charge is required'),
  phone: yup
    .string()
    .matches(/^250\d{9}$/, 'Phone number must start with 250 and be 12 digits')
    .required('Phone number is required'),
  reason: yup.string().required('Reason is required'),
});

type WithdrawFormData = yup.InferType<typeof schema>;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WithdrawFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: WithdrawFormData) => {
    setSubmitting(true);
    try {
      const payload = {
        username: 'testa',
        timestamp: '20161231115242',
        amount: formData.amount,
        withdrawcharge: formData.charge,
        reason: formData.reason,
        password:
          '71c931d4966984a90cee2bcc2953ce432899122b0f16778e5f4845d5ea18f7e6',
        mobilephone: Number(formData.phone),
        requesttransactionid: Math.floor(Math.random() * 1000000),
        callbackurl: 'https://murenzi-business-group.vercel.app/rentals',
      };

      const res = await fetch('/api/intouch/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Withdraw failed');
      }

      toast.success('Withdrawal successful');
      fetchBalance();
      reset();
      setDialogOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Withdraw error:', err);
      toast.error(err.message || 'An error occurred during withdrawal');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchBalance = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/intouch/getbalance', {
        method: 'POST',
      });

      const data = await response.json();
      if (data && data.balance !== undefined) {
        setBalance(data.balance);
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to fetch balance');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between md:justify-end bg-white px-6 py-4 shadow-sm">
            <SidebarTrigger className="lg:hidden" />

            <div className="flex items-center gap-6">
              <div className="text-sm text-primary font-medium">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  `Wallet: RWF ${formatMoney(balance) ?? 0}`
                )}
              </div>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Withdraw</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                      <Input placeholder="Amount" {...register('amount')} />
                      {errors.amount && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        placeholder="Withdrawal Charge"
                        {...register('charge')}
                      />
                      {errors.charge && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.charge.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        placeholder="Mobile Phone"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Textarea placeholder="Reason" {...register('reason')} />
                      {errors.reason && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.reason.message}
                        </p>
                      )}
                    </div>

                    <DialogFooter className="pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Image
                src={logoImage}
                alt="Diaspora Launge Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </header>

          <main className="p-4 flex-1 overflow-y-auto bg-secondary_bg">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
