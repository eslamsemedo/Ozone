import { NextResponse } from 'next/server';
import connectDB from '@/mongoDB/db';
import { Coach } from '@/mongoDB/models/coaches';

export async function GET() {
  try {
    await connectDB();
    const coaches = await Coach.find({});
    return NextResponse.json(coaches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coaches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const coach = await Coach.create(data);
    return NextResponse.json(coach);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create coach' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const { _id, ...updateData } = data;
    const coach = await Coach.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(coach);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update coach' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Coach ID is required' }, { status: 400 });
    }
    await Coach.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Coach deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete coach' }, { status: 500 });
  }
} 