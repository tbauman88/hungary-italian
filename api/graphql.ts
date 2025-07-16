import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-hasura-admin-secret')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const hasuraUrl = process.env.VITE_HASURA_GRAPHQL_URL
    const adminSecret = process.env.VITE_HASURA_ADMIN_SECRET

    if (!hasuraUrl) {
      return res.status(500).json({ error: 'VITE_HASURA_GRAPHQL_URL not configured' })
    }

    const response = await fetch(hasuraUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': adminSecret || '',
        ...(req.headers.authorization && { authorization: req.headers.authorization }),
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    console.error('GraphQL proxy error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 
