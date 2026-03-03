'use client'

export function NewVideoSection() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-900">
          <iframe
            src="https://www.youtube.com/embed/uKaAyAmbN2Q?si=ReY1tgBf0mBRnK2c"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
