import BookWebinarLayoutClient from './BookWebinarLayoutClient'

export default function BookWebinarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BookWebinarLayoutClient>{children}</BookWebinarLayoutClient>
}
