"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Home, Phone, Mail } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PaymentSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const transactionId = searchParams.get("transactionId")

    const handleGoHome = () => {
        router.push("/")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-green-600 w-10 h-10" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-green-700 mb-2">Payment Successful!</CardTitle>
                    <p className="text-gray-600">
                        Your payment has been processed successfully. You'll receive confirmation details via SMS shortly.
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Transaction Status */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-green-700 font-medium">Status:</span>
                            <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>
                        </div>
                        {transactionId && (
                            <div className="flex items-center justify-between">
                                <span className="text-green-700 font-medium">Transaction ID:</span>
                                <span className="text-green-800 font-mono text-sm">{transactionId}</span>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Need Help?
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-blue-600" />
                                <span className="text-blue-700">+250 788 123 456</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-600" />
                                <span className="text-blue-700">support@example.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button onClick={handleGoHome} className="w-full flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Back to Homepage
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
