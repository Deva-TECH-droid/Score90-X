export async function getWorldCupNews() {
  const res = await fetch(
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=2026%20FIFA%20World%20Cup&format=json&origin=*'
  );

  const data = await res.json();

  return data.query.search;
}