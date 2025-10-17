import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Faculty from '@/lib/models/Faculty'

export async function GET() {
  try {
    await dbConnect()
    const faculty = await Faculty.find({}).sort({ createdAt: -1 })
    return NextResponse.json(faculty)
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return NextResponse.json({ error: 'Failed to fetch faculty' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const facultyMember = new Faculty(body)
    await facultyMember.save()
    return NextResponse.json(facultyMember, { status: 201 })
  } catch (error) {
    console.error('Error creating faculty:', error)
    return NextResponse.json({ error: 'Failed to create faculty' }, { status: 500 })
  }
}