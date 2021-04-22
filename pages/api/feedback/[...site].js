import { getAllFeedback, getSite } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const [siteId, route] = req.query.site;
    const { feedback } = await getAllFeedback(siteId, route);
    const { site } = await getSite(siteId);

    res.status(200).json({ feedback, site });
  } catch (error) {
    if (error) {
      res.status(500).json({ error });
    }
  }
};
