import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Activity from '@/lib/models/Activity'

export async function GET() {
  try {
    await dbConnect()
    const activities = await Activity.find({}).sort({ date: -1 })
    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const activity = new Activity(body)
    await activity.save()
    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 })
  }
}