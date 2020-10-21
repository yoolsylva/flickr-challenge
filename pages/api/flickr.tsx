// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Parser, { Output } from 'rss-parser';

let parser = new Parser();

export default async (req: any, res: any) => {
  try {
    const feed: Output = await parser.parseURL(`https://www.flickr.com/services/feeds/photos_public.gne?format=rss_092&tag=${req.query.tag}`)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(feed)
  } catch (e) {
    res.statusCode = 500
    res.json({error: true, message: e.message})
  }
}
