"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { XCircle, RefreshCw, Home, Phone, Mail, AlertTriangle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PaymentFailedPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const transactionId = searchParams.get("transactionId")

    const handleRetryPayment = () => {
        router.push("/")
    }

    const handleGoHome = () => {
        router.push("/")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="text-red-600 w-10 h-10" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-red-700 mb-2">Payment Failed</CardTitle>
                    <p className="text-gray-600">
                        We couldn't process your payment. Don't worry, no money was charged from your account.
                    </p>
                </CardHeader>

                <ScrollArea className="max-h-70 overflow-y-auto">
                    <CardContent className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-red-700 font-medium">Status:</span>
                                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                                    Failed
                                </Badge>
                            </div>
                            {transactionId && (
                                <div className="flex items-center justify-between">
                                    <span className="text-red-700 font-medium">Transaction ID:</span>
                                    <span className="text-red-800 font-mono text-sm">{transactionId}</span>
                                </div>
                            )}
                        </div>

                        {/* What to do next */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                What you can do:
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm text-left">
                                <li>Check your Mobile Money account balance</li>
                                <li>Verify your Mobile Money PIN</li>
                                <li>Try the payment again</li>
                                <li>Contact support if the problem persists</li>
                            </ul>
                        </div>

                        {/* Support Information */}
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
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <Button onClick={handleRetryPayment} className="w-full flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Button>
                        <Button onClick={handleGoHome} variant="outline" className="w-full flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Back to Homepage
                        </Button>
                    </div>
                </CardContent>
                </ScrollArea>
            </Card>
        </div>
    )
}
