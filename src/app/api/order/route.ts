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


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log(id)
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const order = await db.collection('orders').findOne({ _id: new ObjectId(id) });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('DB Get Error:', error);
    return NextResponse.json({ success: false, error: 'DB error' }, { status: 500 });
  }
}
