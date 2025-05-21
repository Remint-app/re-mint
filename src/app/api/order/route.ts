import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('orders').insertOne({
      ...data,
      createdAt: new Date(),
    });

    console.log(result.insertedId)

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('DB Save Error:', error);
    return NextResponse.json({ success: false, error: 'DB error' }, { status: 500 });
  }
}
