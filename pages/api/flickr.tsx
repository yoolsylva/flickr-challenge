import axios from 'axios';

function jsonFlickrFeed(json: Object) {
  return json;
}

export default async (req: any, res: any) => {
  try {
    const response = await axios(`https://www.flickr.com/services/feeds/photos_public.gne?format=json&tag=${req.query.tag}`);
    const resJson: Object = eval(response.data);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resJson);
  } catch (e) {
    res.statusCode = 500;
    res.json({error: true, message: e.message});
  }
}
