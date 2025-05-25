import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, FileText, CreditCard, Shield, Users, Clock, AlertTriangle, Scale } from "lucide-react"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-10 max-w-3xl">
                {/* Enhanced Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <h1 className="text-4xl font-bold text-gray-900">Terms and Conditions</h1>
                    </div>
                    <p className="text-muted-foreground mb-3 leading-relaxed">Last updated: January 2025</p>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="text-sm">
                            No Account Required
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                            Instant Booking
                        </Badge>
                    </div>
                </div>

                <ScrollArea className="h-full">
                    <div className="space-y-6">
                        {/* Introduction */}
                        <Card className="rounded-2xl shadow-sm border-2 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    1. Introduction and Acceptance of Terms
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <p className="text-blue-800 font-medium mb-2">🎉 Welcome to Our Platform!</p>
                                    <p className="text-blue-700 text-sm">
                                        Our apartment rental platform makes booking simple - no accounts, no hassle, just instant bookings
                                        with Mobile Money.
                                    </p>
                                </div>
                                <p className="text-muted-foreground">
                                    By accessing or using our service, you agree to be bound by these Terms and Conditions. If you do not
                                    agree with any part of these terms, you may not use our service. These terms constitute a legally
                                    binding agreement between you and our platform.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Eligibility */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-green-600" />
                                    2. Eligibility
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">To use our platform, you must meet these requirements:</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-800 mb-2">Age & Legal</h4>
                                        <ul className="text-green-700 text-sm space-y-1 list-disc pl-4">
                                            <li>Be at least 18 years of age</li>
                                            <li>Provide valid personal information</li>
                                            <li>Comply with all applicable laws</li>
                                        </ul>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-800 mb-2">Payment Ready</h4>
                                        <ul className="text-blue-700 text-sm space-y-1 list-disc pl-4">
                                            <li>Valid Mobile Money (MoMo) account</li>
                                            <li>Sufficient funds for booking</li>
                                            <li>Active phone number for confirmations</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Service Description */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">3. Service Description</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    Our platform provides a seamless apartment booking experience:
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">1</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Browse & Select</p>
                                            <p className="text-sm text-muted-foreground">
                                                Explore available apartments with detailed descriptions, photos, and pricing
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">2</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Book Instantly</p>
                                            <p className="text-sm text-muted-foreground">
                                                Make online bookings with just your name and phone number
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">3</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Pay Securely</p>
                                            <p className="text-sm text-muted-foreground">
                                                Complete payment through Mobile Money with instant confirmation
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">4</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Access Granted</p>
                                            <p className="text-sm text-muted-foreground">
                                                Receive digital access codes and apartment details via SMS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Booking and Payment */}
                        <Card className="rounded-2xl shadow-sm border-2 border-green-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-green-600" />
                                    4. Booking and Payment
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                    <p className="text-green-800 font-medium mb-2">💳 Mobile Money Only</p>
                                    <p className="text-green-700 text-sm">
                                        All payments are processed exclusively through Mobile Money for your security and convenience.
                                    </p>
                                </div>

                                <p className="text-muted-foreground mb-4">All bookings are subject to these conditions:</p>
                                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                                    <li>Payment must be completed via Mobile Money (MoMo) before access is granted</li>
                                    <li>Apartment access is provided only after successful payment confirmation</li>
                                    <li>Booking confirmation and access details are sent via SMS and email</li>
                                    <li>Payment failures may result in automatic booking cancellation</li>
                                    <li>All prices are displayed in Rwandan Francs (RWF) and include applicable taxes</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Cancellation and Refund */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                    5. Cancellation and Refund Policy
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                                    <p className="text-orange-800 font-medium mb-2">⏰ 48-Hour Rule</p>
                                    <p className="text-orange-700 text-sm">
                                        Cancellations must be made at least 48 hours before your scheduled check-in time.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">Cancellation Window</span>
                                        <span className="text-sm text-muted-foreground">48+ hours before check-in</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">Refund Processing</span>
                                        <span className="text-sm text-muted-foreground">5-7 business days</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">Processing Fee</span>
                                        <span className="text-sm text-muted-foreground">May apply to refunds</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                        <span className="font-medium text-red-800">No-Shows</span>
                                        <span className="text-sm text-red-700">No refund eligible</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Responsibilities */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    6. User Responsibilities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">As a guest, you agree to:</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <h4 className="font-semibold text-blue-800 mb-1">Property Care</h4>
                                            <ul className="text-blue-700 text-sm space-y-1 list-disc pl-4">
                                                <li>Treat the apartment with respect</li>
                                                <li>Report damages immediately</li>
                                                <li>Leave in original condition</li>
                                            </ul>
                                        </div>

                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <h4 className="font-semibold text-green-800 mb-1">Community Respect</h4>
                                            <ul className="text-green-700 text-sm space-y-1 list-disc pl-4">
                                                <li>Maintain reasonable noise levels</li>
                                                <li>Respect neighbors and building rules</li>
                                                <li>Follow local regulations</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                            <h4 className="font-semibold text-purple-800 mb-1">Booking Integrity</h4>
                                            <ul className="text-purple-700 text-sm space-y-1 list-disc pl-4">
                                                <li>Provide accurate information</li>
                                                <li>No unauthorized subletting</li>
                                                <li>Honor booking duration</li>
                                            </ul>
                                        </div>

                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <h4 className="font-semibold text-red-800 mb-1">Prohibited Activities</h4>
                                            <ul className="text-red-700 text-sm space-y-1 list-disc pl-4">
                                                <li>No illegal activities</li>
                                                <li>No smoking (where prohibited)</li>
                                                <li>No unauthorized parties</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Intellectual Property */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">7. Intellectual Property</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                                    <p className="text-gray-800 font-medium mb-2">© Protected Content</p>
                                    <p className="text-gray-600 text-sm">
                                        All platform content including logos, images, and software is protected by intellectual property
                                        laws.
                                    </p>
                                </div>
                                <p className="text-muted-foreground">
                                    You may not reproduce, distribute, or create derivative works from our platform content without
                                    express written permission. This includes apartment photos, descriptions, and proprietary booking
                                    technology.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Limitation of Liability */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                    8. Limitation of Liability
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                    <p className="text-yellow-800 font-medium mb-2">⚠️ Important Notice</p>
                                    <p className="text-yellow-700 text-sm">
                                        While we strive for excellent service, certain limitations apply to our liability.
                                    </p>
                                </div>

                                <p className="text-muted-foreground mb-4">We are not responsible for:</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">Mobile Money system failures</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">Property damage by guests</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">Personal belongings left behind</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">Third-party service disruptions</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">Force majeure events</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-muted-foreground">External website issues</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Privacy Statement */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">9. Privacy Statement</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-blue-800 font-medium mb-2">🔒 Your Privacy Matters</p>
                                    <p className="text-blue-700 text-sm mb-3">
                                        We collect only essential booking information and protect your data with industry-standard security
                                        measures.
                                    </p>
                                    <p className="text-blue-700 text-sm">
                                        For detailed information about data handling, please review our
                                        <a href="/privacy" className="text-blue-600 hover:underline font-medium ml-1">
                                            Privacy Policy
                                        </a>
                                        .
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Termination */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">10. Service Suspension</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    We reserve the right to restrict platform access in cases of:
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                                        <AlertTriangle className="h-5 w-5 text-red-600" />
                                        <span className="text-red-800 font-medium">Policy violations or fraudulent activity</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                                        <span className="text-orange-800 font-medium">Repeated property damage or complaints</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                        <span className="text-yellow-800 font-medium">Misuse of platform features</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Changes to Terms */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">11. Changes to Terms</CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <p className="text-muted-foreground mb-4">
                                    We may update these Terms and Conditions to reflect service improvements or legal requirements:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">Notification Process</p>
                                            <p className="text-sm text-muted-foreground">
                                                Updated terms posted on this page with revised date
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">Acceptance</p>
                                            <p className="text-sm text-muted-foreground">
                                                Continued platform use constitutes acceptance of new terms
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Governing Law */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <Scale className="h-5 w-5 text-purple-600" />
                                    12. Governing Law
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="leading-relaxed">
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                    <p className="text-purple-800 font-medium mb-2">⚖️ Legal Jurisdiction</p>
                                    <p className="text-purple-700 text-sm">
                                        These Terms and Conditions are governed by the laws of Rwanda. Any disputes will be subject to the
                                        exclusive jurisdiction of Rwandan courts.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="rounded-2xl shadow-sm border-2 border-green-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-900">13. Contact Us</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    Questions about these Terms and Conditions? We`&apos;`re here to help:
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                        <Mail className="h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="font-medium text-green-800">Email Support</p>
                                            <a href="mailto:support@example.com" className="text-green-600 hover:underline text-sm">
                                                support@example.com
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
                                    <p className="text-gray-800 font-medium mb-1">📞 Support Hours</p>
                                    <p className="text-gray-600 text-sm">
                                        Monday - Sunday: 8:00 AM - 10:00 PM (EAT) | Average response time: 2 hours
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>

                <Separator className="my-8" />

                {/* Enhanced Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()}Apartment Rental Platform. All rights reserved.</p>
                    <p className="mt-1">These terms comply with Rwanda Commercial Law and consumer protection regulations.</p>
                </div>
            </div>
        </div>
    )
}
