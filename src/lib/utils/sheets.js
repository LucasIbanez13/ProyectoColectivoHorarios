const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTChIcJRgnvyQPKB4AglB-qsU01Nz-bALshLZv9n1sf0UdJPyGCmssaABBclNyQV920ocJvrt81lqLb/pub?output=csv';

export async function getHorarios() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const rows = text.split('\n').map(r => r.split(','));
  const headers = rows.shift();
  return rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h.trim()] = row[i]?.trim());
    return obj;
  });
}
