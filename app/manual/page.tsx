import Link from "next/link";
import { ArrowLeft, Power, Lightbulb, Battery, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "User Manual | The Pocket Scope",
  description: "Complete user guide and operating instructions for The Pocket Scope portable electronic magnifier",
};

export default function UserManualPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-gray-800 bg-gray-900">
          <div className="container-padding mx-auto max-w-7xl py-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-indigo-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </section>

        {/* Header */}
        <section className="bg-gradient-to-br from-indigo-950 via-gray-900 to-purple-950 py-16 md:py-24">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-sm font-semibold px-4 py-2">
              User Manual
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              The Pocket Scope
            </h1>
            <p className="text-xl text-gray-300">
              Complete Operating Instructions & User Guide
            </p>
          </div>
        </section>

        {/* Product Overview */}
        <section className="bg-gray-900 py-16">
          <div className="container-padding mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">📱 Product Overview</h2>
                <p className="text-gray-300 mb-6">
                  This Portable Electronic Magnifier is designed for clear, detailed viewing of small objects.
                  It features an HD camera, adjustable magnification, and multiple lighting modes — perfect for
                  coins, jewelry, stamps, collectibles, and especially trading cards.
                </p>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Main Features</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>2.4" HD IPS Display</strong> - High-resolution screen (320×240 pixels)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>1MP Camera</strong> - High-definition lens for crystal-clear viewing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Adjustable Magnification</strong> - 5×, 9×, and 14× zoom levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Triple Lighting Modes</strong> - White light, UV light, or no light</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Rechargeable 500mAh Battery</strong> - Long-lasting use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Auto Power-Off</strong> - Shuts down after 10 minutes of inactivity</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Use */}
        <section className="bg-gray-900 py-16">
          <div className="container-padding mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold text-white mb-8 text-center">⚙️ How to Use</h2>

            {/* Power Button */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 mb-6">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-indigo-500/20 p-3 rounded-xl">
                    <Power className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Power Button (M Button - Right Side)</h3>
                    <p className="text-gray-400">Located on the right-hand side of the device, marked with an "M"</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">🔹 Turn On</h4>
                    <p className="text-gray-300">Press briefly to power on the device</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">🔹 Turn Off</h4>
                    <p className="text-gray-300">Hold for 3 seconds to power off the device</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">🔹 Switch Magnification</h4>
                    <p className="text-gray-300">Press briefly while device is on to toggle between:</p>
                    <ul className="mt-2 ml-4 space-y-1 text-gray-300">
                      <li>• 5× zoom</li>
                      <li>• 9× zoom</li>
                      <li>• 14× zoom</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Light Button */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 mb-6">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-yellow-500/20 p-3 rounded-xl">
                    <Lightbulb className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Lighting Button (Left Side)</h3>
                    <p className="text-gray-400">Located on the left-hand side of the device</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <p className="text-gray-300 mb-3">Press briefly to switch between three lighting modes:</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-white font-semibold">💡 White Light:</span>
                      <span className="text-gray-300">Bright, clear viewing for general inspection</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white font-semibold">🔦 UV Light:</span>
                      <span className="text-gray-300">For material authentication or currency/card inspection (detects PSA/BGS security marks)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white font-semibold">⚫ No Light:</span>
                      <span className="text-gray-300">For use in bright daylight conditions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charging */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-emerald-500/20 p-3 rounded-xl">
                    <Battery className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Charging Instructions</h3>
                    <p className="text-gray-400">Keep your Pocket Scope powered and ready</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
                  <p className="text-gray-300">
                    Connect to power using the included USB charging cable
                  </p>

                  <div className="border-t border-gray-700 pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-white font-semibold">Red Light:</span>
                      <span className="text-gray-300">Device is charging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-white font-semibold">Green Light:</span>
                      <span className="text-gray-300">Fully charged</span>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                    <p className="text-yellow-300 text-sm">
                      <strong>Important:</strong> Use only the provided charging cable or a compatible USB cable.
                      Avoid overcharging the device.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Proper Usage for Card Inspection */}
        <section className="bg-gray-900 py-16">
          <div className="container-padding mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
                    Important Usage Note
                  </Badge>
                  <h2 className="text-2xl font-bold text-white mb-2">🎯 Proper Card Inspection Technique</h2>
                </div>

                <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6">
                  <p className="text-lg text-white font-semibold mb-4">
                    The Pocket Scope MUST be flush with the card surface when analyzing
                  </p>
                  <p className="text-gray-300 mb-4">
                    For accurate inspection and clear magnification:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Place the device directly on the card surface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Ensure the lens is making contact with or very close to the card</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Hold steady for clearest view</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Adjust magnification as needed (5×, 9×, or 14×)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Use appropriate lighting (white for surface inspection, UV for authentication)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Precautions */}
        <section className="bg-gray-900 py-16">
          <div className="container-padding mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold text-white mb-8 text-center">⚠️ Important Precautions</h2>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Heat & Light Exposure</h3>
                      <p className="text-gray-300">
                        Avoid exposing the device to high heat or strong direct light for extended periods
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Physical Protection</h3>
                      <p className="text-gray-300">
                        Do not drop or apply pressure to the screen or lens. Handle with care to prevent damage
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Cleaning</h3>
                      <p className="text-gray-300">
                        Clean gently with a soft, dry cloth. Do not use harsh chemicals or abrasive materials
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Charging Safety</h3>
                      <p className="text-gray-300">
                        Charge only with the provided or compatible USB cable. Do not use while charging for extended periods
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Auto Power-Off</h3>
                      <p className="text-gray-300">
                        The device will automatically shut down after 10 minutes of inactivity to conserve battery
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Reference Guide */}
        <section className="bg-gray-900 py-16">
          <div className="container-padding mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold text-white mb-8 text-center">📋 Quick Reference Guide</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Controls */}
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🎮 Controls</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Power On</span>
                      <span className="text-white">Press M button</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Power Off</span>
                      <span className="text-white">Hold M button (3s)</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Zoom</span>
                      <span className="text-white">Press M button</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Light Mode</span>
                      <span className="text-white">Press left button</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📊 Specifications</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Display</span>
                      <span className="text-white">2.4" IPS (320×240)</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Magnification</span>
                      <span className="text-white">5×, 9×, 14×</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Camera</span>
                      <span className="text-white">1MP HD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Battery</span>
                      <span className="text-white">500mAh</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-indigo-950 via-gray-900 to-purple-950 py-16">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Need More Help?
            </h2>
            <p className="text-gray-300 mb-8">
              Have questions about using your Pocket Scope? Our customer support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                <Link href="/products/pocket-scope">
                  View Product Details
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
