#!/usr/bin/env node
const HOST = "amartuvshin.com";
const KEY = "abdb82c4beb645798938694e1af669df";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urls) {
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  const body = await res.text();
  console.log(`status: ${res.status}`);
  if (body) console.log(body);
  if (!res.ok) process.exit(1);
}

const cliUrls = process.argv.slice(2);
const urls = cliUrls.length ? cliUrls : await fetchSitemapUrls();
if (!urls.length) {
  console.error("no URLs to submit");
  process.exit(1);
}
console.log(`submitting ${urls.length} URL(s):`);
urls.forEach((u) => console.log(`  ${u}`));
await submit(urls);
