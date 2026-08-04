import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://world-cup-score90-x.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/live-matches`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/matches`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bracket`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/table-standing`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/group-standings`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/top-scorers`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.7,
    },
  ];
}