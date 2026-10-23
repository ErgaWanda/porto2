const W = Number(process.argv[2] || 390);
const H = Number(process.argv[3] || 844);
const OUT = process.argv[4] || "_cap.png";
const MODE = process.argv[5] || "dialog";
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const { spawn } = await import("node:child_process");
const p = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--remote-debugging-port=9240",
  `--user-data-dir=${process.cwd()}\\_ctmpC`,
  `--window-size=${W},${H}`,
  "about:blank",
]);
const get = async (u) => {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(u);
      if (r.ok) return r.json();
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("no devtools");
};
const list = await get("http://127.0.0.1:9240/json/list");
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (m, params = {}) =>
  new Promise((res) => {
    const n = ++id;
    pending.set(n, res);
    ws.send(JSON.stringify({ id: n, method: m, params }));
  });
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) pending.get(m.id)(m.result), pending.delete(m.id);
};
await new Promise((r) => (ws.onopen = r));
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true })).result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: W < 700 });
await send("Page.navigate", { url: "http://localhost:4321/" });
await new Promise((r) => setTimeout(r, 3000));
if (MODE === "dialog") {
  await ev(
    `(()=>{const t=[...document.querySelectorAll('.pslab button, .pslab a')].find(e=>/studi kasus|detail|buka/i.test(e.textContent));(t||document.querySelector('.pslab__body')).click()})()`
  );
  await new Promise((r) => setTimeout(r, 1400));
  console.log(
    "lock:",
    await ev(
      `JSON.stringify({bodyPos:getComputedStyle(document.body).position,bodyTop:document.body.style.top,htmlOvf:getComputedStyle(document.documentElement).overflowY,scrollY:Math.round(window.scrollY)})`
    )
  );
  console.log(
    "dialog:",
    await ev(
      `(()=>{const d=document.querySelector('.dialog'),b=d.querySelector('.dialog__body');return JSON.stringify({h:Math.round(d.getBoundingClientRect().height),transform:getComputedStyle(d).transform,bodyClient:b.clientHeight,bodyScroll:b.scrollHeight,ta:getComputedStyle(b).touchAction})})()`
    )
  );
} else if (MODE) {
  await ev(
    `(()=>{const e=document.querySelector(${JSON.stringify(MODE)});window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY-40,behavior:'instant'})})()`
  );
  await new Promise((r) => setTimeout(r, 1600));
}
const shot = await send("Page.captureScreenshot", { format: "png" });
const fs = await import("node:fs");
fs.writeFileSync(OUT, Buffer.from(shot.data, "base64"));
console.log(OUT);
ws.close();
p.kill();
