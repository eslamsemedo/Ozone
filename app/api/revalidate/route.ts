import { revalidatePath } from 'next/cache';
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Revalidate the home/nurion route
    revalidatePath('/home/nutrition');
    // redirect('/home/nutrition');
    // Revalidate the generateDeitPlan route

    return NextResponse.json({ message: 'Revalidation triggered successfully.' });
  } catch (error) {
    console.error('Error triggering revalidation:', error);
    return NextResponse.json({ error: 'Failed to trigger revalidation.' }, { status: 500 });
  }
}