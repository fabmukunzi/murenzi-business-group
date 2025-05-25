import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Shield, Lock, UserX, CreditCard } from "lucide-react"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-10 max-w-3xl">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-8 w-8 text-blue-600" />
                        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
                    </div>
                    <p className="text-muted-foreground mb-3 leading-relaxed">Last updated: January 2025</p>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="text-sm">
                            No Account Required
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                            GDPR Compliant
                        </Badge>
                    </div>
                </div>

                <ScrollArea className="h-full">
                    <div className="space-y-6">
                        {/* Introduction */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">1. Introduction</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    This Privacy Policy explains how we collect, use, and protect your information when you use our
                                    apartment rental platform. Our service is designed to be simple and straightforward - you can book
                                    apartments and pay via Mobile Money without creating an account or registering.
                                </p>
                                <p className="text-muted-foreground">
                                    We are committed to protecting your privacy and handling your data responsibly and transparently.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Data We Collect */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">2. Data We Collect</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    Since our platform doesn`&apos;`t require account creation, we only collect essential information needed to
                                    process your booking:
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-800 mb-2">Booking Information</h4>
                                        <ul className="text-blue-700 text-sm space-y-1 list-disc pl-4">
                                            <li>Your name and phone number</li>
                                            <li>Selected apartment and booking dates</li>
                                            <li>Check-in and check-out preferences</li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-800 mb-2">Payment Information</h4>
                                        <ul className="text-green-700 text-sm space-y-1 list-disc pl-4">
                                            <li>Mobile Money transaction reference</li>
                                            <li>Payment confirmation status</li>
                                            <li>Transaction timestamp</li>
                                        </ul>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>

                        {/* How We Use Data */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">3. How We Use Your Data</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    We use your information solely for legitimate business purposes:
                                </p>
                                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                                    <li>Process and confirm your apartment booking</li>
                                    <li>Verify Mobile Money payment completion</li>
                                    <li>Send booking confirmations and access details via SMS</li>
                                    <li>Provide customer support when needed</li>
                                    <li>Improve our platform based on usage patterns</li>
                                    <li>Maintain records for business and legal compliance</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* No User Accounts */}
                        <Card className="rounded-2xl shadow-sm border-2 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <UserX className="h-5 w-5 text-blue-600" />
                                    4. No User Accounts Required
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-blue-800 font-medium mb-2">🎉 Simple Booking Process</p>
                                    <p className="text-blue-700 text-sm mb-3">
                                        You don`&apos;`t need to create an account, remember passwords, or go through lengthy registration
                                        processes to book an apartment.
                                    </p>
                                    <ul className="text-blue-700 text-sm space-y-1 list-disc pl-4">
                                        <li>Browse apartments without signing up</li>
                                        <li>Book instantly with just your name and phone</li>
                                        <li>Pay securely via Mobile Money</li>
                                        <li>Receive access details immediately</li>
                                    </ul>
                                </div>
                                <p className="text-muted-foreground mt-4">
                                    All necessary information is collected only during the booking process, making your experience fast
                                    and hassle-free.
                                </p>
                            </CardContent>
                        </Card>

                        {/* MoMo Payment Handling */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-green-600" />
                                    5. Mobile Money Payment Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">Your payment security is our top priority:</p>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <Lock className="h-6 w-6 text-green-600 mb-2" />
                                        <h4 className="font-semibold text-green-800 mb-1">Secure Processing</h4>
                                        <p className="text-green-700 text-sm">
                                            All MoMo payments are processed through official Mobile Money APIs with bank-grade security.
                                        </p>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <Shield className="h-6 w-6 text-red-600 mb-2" />
                                        <h4 className="font-semibold text-red-800 mb-1">No Storage</h4>
                                        <p className="text-red-700 text-sm">
                                            We never store your MoMo PIN, account details, or sensitive payment credentials.
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                                    <li>Only transaction references and confirmation status are retained</li>
                                    <li>Payment data is encrypted during transmission</li>
                                    <li>We comply with financial data protection standards</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Data Sharing */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">6. Data Sharing</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    We respect your privacy and follow strict data sharing principles:
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">We Never Sell Your Data</p>
                                            <p className="text-sm text-muted-foreground">
                                                Your personal information is never sold to advertisers or third parties.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">Trusted Service Providers</p>
                                            <p className="text-sm text-muted-foreground">
                                                We may share data with Mobile Money providers and SMS services only to complete your booking.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">Legal Compliance</p>
                                            <p className="text-sm text-muted-foreground">
                                                Information may be shared when required by law or to protect our platform and users.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cookies and Analytics */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">7. Cookies and Analytics</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">We use minimal tracking to improve your experience:</p>
                                <ul className="space-y-2 text-muted-foreground list-disc pl-6 mb-4">
                                    <li>Essential cookies for platform functionality and booking process</li>
                                    <li>Anonymous analytics to understand usage patterns and improve the service</li>
                                    <li>No personally identifiable tracking or behavioral profiling</li>
                                </ul>
                                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                                    💡 You can disable cookies in your browser settings, though this may affect some platform features.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Data Retention */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">8. Data Retention</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">We keep your data only as long as necessary:</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">Booking Records</span>
                                        <span className="text-sm text-muted-foreground">3 years (for business records)</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">Payment References</span>
                                        <span className="text-sm text-muted-foreground">5 years (legal requirement)</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">Analytics Data</span>
                                        <span className="text-sm text-muted-foreground">12 months (anonymized)</span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mt-4">
                                    You can request deletion of your booking data by contacting our support team.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Privacy Rights */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">9. Your Privacy Rights</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    Even without an account, you have important privacy rights:
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white text-sm font-bold">📋</span>
                                        </div>
                                        <h4 className="font-semibold text-blue-800 mb-1">Access</h4>
                                        <p className="text-sm text-blue-700">Request a copy of your booking data</p>
                                    </div>

                                    <div className="text-center p-4 bg-red-50 rounded-lg">
                                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white text-sm font-bold">🗑️</span>
                                        </div>
                                        <h4 className="font-semibold text-red-800 mb-1">Delete</h4>
                                        <p className="text-sm text-red-700">Request deletion of your information</p>
                                    </div>

                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white text-sm font-bold">❓</span>
                                        </div>
                                        <h4 className="font-semibold text-green-800 mb-1">Clarify</h4>
                                        <p className="text-sm text-green-700">Ask how your data is being used</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Policy Updates */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">10. Updates to This Policy</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    We may update this Privacy Policy occasionally to reflect changes in our practices or legal
                                    requirements. When we do:
                                </p>
                                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                                    <li>The updated policy will be posted on this page</li>
                                    <li>The `&quot;`Last updated`&quot;` date will be revised</li>
                                    <li>Significant changes will be highlighted clearly</li>
                                    <li>Your continued use of the platform means you accept the updated terms</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="rounded-2xl shadow-sm border-2 border-green-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">11. Contact Us</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    Have questions about your privacy or want to exercise your data rights? We`&apos;`re here to help:
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                        <Mail className="h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="font-medium text-green-800">Email Support</p>
                                            <a href="mailto:support@example.com" className="text-green-600 hover:underline text-sm">
                                                diaspora@support.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                        <Phone className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="font-medium text-blue-800">Phone Support</p>
                                            <span className="text-blue-700 text-sm">+250 788 989 575</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                                        <MapPin className="h-5 w-5 text-purple-600" />
                                        <div>
                                            <p className="font-medium text-purple-800">Office Location</p>
                                            <span className="text-purple-700 text-sm">Kigali, Rwanda</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-gray-800 font-medium mb-1">⚡ Quick Response Promise</p>
                                    <p className="text-gray-600 text-sm">
                                        We respond to all privacy inquiries within 24 hours and fulfill data requests within 7 days.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>

                <Separator className="my-8" />

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} diaspora stop center. All rights reserved.</p>
                    <p className="mt-1">
                        This policy complies with Rwanda Data Protection Law and international privacy standards.
                    </p>
                </div>
            </div>
        </div>
    )
}
