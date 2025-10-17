import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Facility from '@/lib/models/Facility'

export async function GET() {
  try {
    await dbConnect()
    const facilities = await Facility.find({}).sort({ createdAt: -1 })
    return NextResponse.json(facilities)
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return NextResponse.json({ error: 'Failed to fetch facilities' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const facility = new Facility(body)
    await facility.save()
    return NextResponse.json(facility, { status: 201 })
  } catch (error) {
    console.error('Error creating facility:', error)
    return NextResponse.json({ error: 'Failed to create facility' }, { status: 500 })
  }
}