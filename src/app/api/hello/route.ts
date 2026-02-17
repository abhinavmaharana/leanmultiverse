import { NextResponse } from 'next/server'
import { requireProductionDisabled } from '@/lib/production-guard'

export async function GET() {
  const disabled = requireProductionDisabled()
  if (disabled) return disabled

  return NextResponse.json({
    message: 'Hello from LeanMultiverse API!',
    timestamp: new Date().toISOString(),
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  })
}

export async function POST(request: Request) {
  const disabled = requireProductionDisabled()
  if (disabled) return disabled

  try {
    const body = await request.json()
    return NextResponse.json({
      message: 'Data received successfully!',
      receivedData: body,
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}
