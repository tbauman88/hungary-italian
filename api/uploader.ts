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
  console.log('🔄 Upload request received:', req.method, req.url)
  console.log('📝 Request body:', req.body)
  console.log('🔑 Environment variables check:')
  console.log('  - AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET')
  console.log('  - AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET')
  console.log('  - AWS_REGION:', process.env.AWS_REGION || 'us-east-2')
  console.log('  - S3_BUCKET_NAME:', process.env.S3_BUCKET_NAME || 'NOT SET')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { filename, contentType } = req.body

    console.log('📄 Request data:', { filename, contentType })

    if (!filename || !contentType) {
      console.log('❌ Missing filename or contentType')
      return res.status(400).json({ error: 'Missing filename or contentType' })
    }

    if (!contentType.startsWith('image/')) {
      console.log('❌ Invalid content type:', contentType)
      return res.status(400).json({ error: 'Invalid content type' })
    }

    console.log('🔧 Creating upload params...')
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `recipes/${filename}`,
      ContentType: contentType,
    })

    console.log('📦 Upload params:', { Bucket: process.env.S3_BUCKET_NAME, Key: `recipes/${filename}`, ContentType: contentType })
    console.log('⏳ Generating presigned URL...')

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 })

    console.log('✅ Presigned URL generated successfully')
    res.status(200).json({
      success: true,
      uploadUrl: presignedUrl,
      filename: filename
    })
  } catch (error) {
    console.error('❌ Error generating presigned URL:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    res.status(500).json({
      success: false,
      error: 'Failed to generate upload URL',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
