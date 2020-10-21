// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let Parser = require('rss-parser');
let parser = new Parser();

export default async (req : any, res: any) => {
  const feed : any = await parser.parseURL(`https://www.flickr.com/services/feeds/photos_public.gne?format=rss_092&tag=${req.query.tag}`)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(feed)
}
