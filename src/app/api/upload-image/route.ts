import { NextRequest } from 'next/server';

export const post = async (request: NextRequest) => {
  const formData = await request.formData();
  const file = formData.get('image') as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  const data = {
    image: `data:${file.type};base64,${base64}`,
  };

  return {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};
