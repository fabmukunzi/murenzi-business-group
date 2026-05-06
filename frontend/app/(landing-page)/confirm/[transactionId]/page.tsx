'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneIncomingIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

interface StatusUpdatedEventData {
    transactionid: string;
    requesttransactionid: string;
    status: string;
}

export default function ConfirmationPage() {

    const handleGoHome = () => {
        router.push("/");
    };
    const router = useRouter();
    const params = useParams();
    const transactionId = params.transactionId as string;
    const [statusUpdate, setStatusUpdate] = useState<StatusUpdatedEventData | null>(null);

    useEffect(() => {
        if (!transactionId) return;

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
            forceTLS: true,
        });

        const channel = pusher.subscribe('transactions');

        channel.bind('status-updated', (data: StatusUpdatedEventData) => {
            setStatusUpdate(data);
            console.log('Pusher event received:', statusUpdate);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [transactionId, router]);

    useEffect(() => {
        if (statusUpdate) {
            console.log('Status update received:', statusUpdate);
            if (statusUpdate.transactionid === transactionId ||
                statusUpdate.requesttransactionid === transactionId) {
                switch (statusUpdate.status.toLowerCase()) {
                    case 'successfull':
                        router.push(`/confirm/success?transactionId=${transactionId}`);
                        break;
                    case 'failed':
                        router.push(`/confirm/failed?transactionId=${transactionId}`);
                        break;
                    default:
                        console.log('Unhandled status:', statusUpdate.status);
                    
                }
            }
        }
    }, [statusUpdate, transactionId, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-2">
                        <PhoneIncomingIcon className="text-yellow-500 w-14 h-14" />
                    </div>
                    <CardTitle className="text-2xl">Dial *182*7*1# to approve it.</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600">
                        Your Payment transaction is Pending. Dial *182*7*1# to approve it.
                    </p>
                    <Button onClick={handleGoHome} className="w-full">
                        Go to Homepage
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}