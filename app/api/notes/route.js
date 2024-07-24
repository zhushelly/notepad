import { NextResponse } from 'next/server';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/notes';

export async function GET() {
  try {
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await axios.post(apiUrl, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id } = new URL(request.url).searchParams;
    const body = await request.json();
    const response = await axios.put(`${apiUrl}/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Error updating note' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = new URL(request.url).searchParams;
    await axios.delete(`${apiUrl}/${id}`);
    return NextResponse.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}
