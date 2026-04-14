export async function fetcher(url: string, init?: RequestInit) {
  return await fetch(url, init);
}
