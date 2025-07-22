import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { VercelRequest, VercelResponse } from '@vercel/node'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { filename, contentType } = req.body

    if (!filename || !contentType) {
      return res.status(400).json({ error: 'Missing filename or contentType' })
    }

    if (!contentType.startsWith('image/')) {
      return res.status(400).json({ error: `Invalid content type: ${contentType}` })
    }

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `recipes/${filename}`,
      ContentType: contentType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 })

    res.status(200).json({ success: true, uploadUrl, filename })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate upload URL',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
