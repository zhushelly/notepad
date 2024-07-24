import { NextResponse } from 'next/server';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/notes';

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
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }
  
      const body = await request.json();
      if (!body.text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
      }
  
      const response = await axios.put(`${apiUrl}/${id}`, body);
      console.log('PUT response:', response.data); // Debug log
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
