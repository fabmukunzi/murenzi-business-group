'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-2">
                        <CheckCircle className="text-green-500 w-14 h-14" />
                    </div>
                    <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
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
