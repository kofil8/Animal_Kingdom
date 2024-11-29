import { NextRequest, NextResponse } from 'next/server';

export const post = async (request: NextRequest) => {
  const formData = await request.formData();
  const imageFile = formData.get('image') as File;
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  const imageBase64 = imageBuffer.toString('base64');
  const responseData = {
    image: `data:${imageFile.type};base64,${imageBase64}`,
  };

  return NextResponse.json(responseData, { status: 201 });
};

