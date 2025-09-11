import Image from "next/image"

interface ServiceCardProps {
  title: string
  description: string
  bullets: string[]
  image: string
  accentColor?: string
}

export default function ServiceCard({
  title,
  description,
  bullets,
  image,
  accentColor = "text-red-600",
}: ServiceCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-black text-white p-10 rounded-2xl shadow-xl">
      {/* Left: Text */}
      <div className="max-w-xl">
        <h1 className={`text-5xl font-bold mb-4 ${accentColor}`}>{title}</h1>
        <p className="text-gray-300 leading-relaxed">{description}</p>

        {/* Bullet List */}
        <ul className="mt-6 space-y-2 text-gray-300">
          {bullets.map((bullet, i) => (
            <li key={i}>➤ {bullet}</li>
          ))}
        </ul>
      </div>

      {/* Right: Image */}
      <div className="mt-10 md:mt-0 md:ml-10">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  )
}
