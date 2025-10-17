import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Exam from '@/lib/models/Exam'

export async function GET() {
  try {
    await dbConnect()
    const exams = await Exam.find({}).sort({ createdAt: -1 })
    return NextResponse.json(exams)
  } catch (error) {
    console.error('Error fetching exams:', error)
    return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const exam = new Exam(body)
    await exam.save()
    return NextResponse.json(exam, { status: 201 })
  } catch (error) {
    console.error('Error creating exam:', error)
    return NextResponse.json({ error: 'Failed to create exam' }, { status: 500 })
  }
}