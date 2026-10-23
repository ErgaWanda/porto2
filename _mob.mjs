const W = 390, H = 844;
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const { spawn } = await import("node:child_process");
const fs = await import("node:fs");
const p = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--remote-debugging-port=9243",
  `--user-data-dir=${process.cwd()}\\_ctmpF`, `--window-size=${W},${H}`, "about:blank",
]);
const get = async (u) => {
  for (let i = 0; i < 80; i++) {
    try { const r = await fetch(u); if (r.ok) return r.json(); } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("no devtools");
};
const list = await get("http://127.0.0.1:9243/json/list");
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (m, params = {}) => new Promise((res) => { const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method: m, params })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) pending.get(m.id)(m.result), pending.delete(m.id); };
await new Promise((r) => (ws.onopen = r));
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true })).result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: "http://localhost:4321/" });
await new Promise((r) => setTimeout(r, 3200));
await ev(`(()=>{const t=[...document.querySelectorAll('.pslab button, .pslab a')].find(e=>/studi kasus|detail|buka/i.test(e.textContent));(t||document.querySelector('.pslab__body')).click()})()`);
await new Promise((r) => setTimeout(r, 1500));

// where is the inner scroller, and what else can scroll?
console.log("scrollers:", await ev(
  `(()=>{const out=[];if(document.documentElement.scrollHeight>document.documentElement.clientHeight)out.push(['html',document.documentElement.scrollHeight,document.documentElement.clientHeight]);
  if(document.body.scrollHeight>document.body.clientHeight)out.push(['body',document.body.scrollHeight,document.body.clientHeight]);
  document.querySelectorAll('*').forEach(e=>{const s=getComputedStyle(e);if(/auto|scroll/.test(s.overflowY)&&e.scrollHeight-e.clientHeight>40)out.push([e.className&&String(e.className).slice(0,40),e.scrollHeight,e.clientHeight]);});
  return JSON.stringify(out.slice(0,10))})()`));

// audit: any element wider than the dialog plate (horizontal overflow inside popup)
console.log("overflow-x offenders:", await ev(
  `(()=>{const d=document.querySelector('.dialog');const dr=d.getBoundingClientRect();const bad=[];
  d.querySelectorAll('.dialog__body *').forEach(e=>{const r=e.getBoundingClientRect();
    if(r.width>0&&(r.right>dr.right+1||r.left<dr.left-1))bad.push([String(e.className||e.tagName).slice(0,34),Math.round(r.left),Math.round(r.right)]);});
  return JSON.stringify(bad.slice(0,12))})()`));

const spots = [0, 500, 1000, 1500];
for (let i = 0; i < spots.length; i++) {
  await ev(`(()=>{const b=document.querySelector('.dialog__body');b.scrollTop=${spots[i]};b.dispatchEvent(new Event('scroll'))})()`);
  await new Promise((r) => setTimeout(r, 500));
  console.log("at", spots[i], "->", await ev(`(()=>{const b=document.querySelector('.dialog__body');return JSON.stringify({top:b.scrollTop,max:b.scrollHeight-b.clientHeight})})()`));
  const shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(`_mob_${i}.png`, Buffer.from(shot.data, "base64"));
}
ws.close(); p.kill();
