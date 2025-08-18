import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from LeanMultiverse API!',
    timestamp: new Date().toISOString(),
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui']
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      message: 'Data received successfully!',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}
