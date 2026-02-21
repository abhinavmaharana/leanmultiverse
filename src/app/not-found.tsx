import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-lg text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page not found</h2>
        <p className="text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-8 py-6 font-semibold"
          >
            <Link href="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20 rounded-full px-8 py-6 font-semibold"
          >
            <Link href="/services">Services</Link>
          </Button>
        </div>
        <p className="text-gray-500 text-sm mt-8">
          Need help? <Link href="#contact" className="text-yellow-400 hover:underline">Contact us</Link> or visit our{' '}
          <Link href="/services" className="text-yellow-400 hover:underline">Services</Link> page.
        </p>
      </div>
    </main>
  )
}
