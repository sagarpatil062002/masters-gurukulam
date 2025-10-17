import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Testimonial from '@/lib/models/Testimonial'

export async function GET() {
  try {
    await dbConnect()
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const testimonial = new Testimonial(body)
    await testimonial.save()
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}