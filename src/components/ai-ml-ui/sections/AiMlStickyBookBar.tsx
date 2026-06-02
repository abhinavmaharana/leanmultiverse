'use client'

import BookAiMlWebinarModal from './BookAiMlWebinarModal'

export default function AiMlStickyBookBar() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4">
      <div className="bg-white border border-gray-200 rounded-full shadow-xl py-3 px-6 flex items-center justify-between">
        <div className="text-sm text-gray-800 font-medium">
          Reserve your webinar seat — Only ₹99
        </div>

        <BookAiMlWebinarModal source="sticky-bar" />
      </div>
    </div>
  )
}
