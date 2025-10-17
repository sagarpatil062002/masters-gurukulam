import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Video from '@/lib/models/Video'

export async function GET() {
  try {
    await dbConnect()
    const videos = await Video.find({}).sort({ createdAt: -1 })
    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const video = new Video(body)
    await video.save()
    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
  }
}