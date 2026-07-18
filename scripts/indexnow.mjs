#!/usr/bin/env node
const HOSTS = ["amartuvshin.com", "portfolio.amartuvshin.com"];
const KEY = "abdb82c4beb645798938694e1af669df";

async function fetchSitemapUrls(host) {
  const sitemapUrl = `https://${host}/sitemap.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status} ${sitemapUrl}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].trim(),
  );
}

async function submit(host, urls) {
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: KEY,
      keyLocation: `https://${host}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  const body = await res.text();
  console.log(`${host}: ${res.status}`);
  if (body) console.log(body);
  if (!res.ok) process.exitCode = 1;
}

const cliUrls = process.argv.slice(2);

if (cliUrls.length) {
  const urlsByHost = Map.groupBy(cliUrls, (url) => new URL(url).hostname);
  await Promise.all(
    [...urlsByHost].map(([host, urls]) => submit(host, urls)),
  );
} else {
  await Promise.all(
    HOSTS.map(async (host) => {
      const urls = await fetchSitemapUrls(host);
      if (!urls.length) {
        console.error(`${host}: no URLs to submit`);
        process.exitCode = 1;
        return;
      }
      console.log(`${host}: submitting ${urls.length} URL(s)`);
      urls.forEach((url) => console.log(`  ${url}`));
      await submit(host, urls);
    }),
  );
}
