import { posts } from "../../posts";
import { SITE_URL } from "../../../morkerfyr.config";

function renderXmlRssFeed(posts) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>Mörkerfyr Reviews</title>
        <link>${SITE_URL}</link>
        <description>Музыка, пони. Пони, музыка. Йей!</description>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <image>
          <url>${SITE_URL}/beacon_couple.webp</url>
          <title>Mörkerfyr Reviews</title>
          <link>${SITE_URL}</link>
        </image>
        ${posts
          .map(
            (post) => `
          <item>
            <title>${post.title}</title>
            <link>${SITE_URL}/posts/${post.slug}</link>
            <guid isPermaLink="false">${SITE_URL}/posts/${post.slug}</guid>
            <description>Рецензия на альбом ${
              post.title
            }. Теги: ${post.tags.join(", ")}.</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          </item>
        `
          )
          .join("\n")}
      </channel>
    </rss>`;
}

export function get(req, res) {
  res.writeHead(200, {
    "Cache-Control": `max-age=0, s-max-age=${600}`, // 10 minutes
    "Content-Type": "application/rss+xml",
  });

  const feed = renderXmlRssFeed(posts);
  res.end(feed);
}
