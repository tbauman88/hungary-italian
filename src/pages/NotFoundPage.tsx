
import { Link } from 'react-router-dom'

const text: Record<string, string> = {
  error: '404',
  title: 'Page Not Found',
  description: 'Looks like your recipe got lost in the kitchen! Maybe it\'s still simmering somewhere...',
  button: 'Back to the Kitchen'
}

const IMAGE: string = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1500&q=80'

export default function NotFoundPage() {
  return (
    <main className="isolate min-h-full">
      <img
        src={IMAGE}
        alt="404"
        className="absolute inset-0 -z-10 size-full object-cover object-top blur-sm"
      />
      <div className="absolute inset-0 -z-10 bg-black/65" />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <p className="text-base/8 font-semibold text-white drop-shadow-lg">{text.error}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white drop-shadow-lg sm:text-7xl">{text.title}</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-white/70 drop-shadow-lg sm:text-xl/8 max-w-md text-balance">
          {text.description}
        </p>
        <div className="mt-10 flex justify-center">
          <Link to="/" className="text-lg font-normal text-white hover:text-white/90 transition-colors drop-shadow-lg">
            <span aria-hidden="true">&larr;</span> {text.button}
          </Link>
        </div>
      </div>
    </main>
  )
}
