const W = 390;
const H = 844;
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const { spawn } = await import("node:child_process");
const p = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--remote-debugging-port=9242",
  `--user-data-dir=${process.cwd()}\\_ctmpE`,
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
const list = await get("http://127.0.0.1:9242/json/list");
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
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: "http://localhost:4321/" });
await new Promise((r) => setTimeout(r, 3000));
await ev(
  `(()=>{const e=document.querySelector('#projects');window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY+600,behavior:'instant'})})()`
);
await new Promise((r) => setTimeout(r, 900));
console.log(
  "before open:",
  await ev(
    `JSON.stringify({y:Math.round(window.scrollY),docH:document.documentElement.scrollHeight,projTop:Math.round(document.querySelector('#projects').getBoundingClientRect().top+window.scrollY)})`
  )
);
await ev(
  `(()=>{const t=[...document.querySelectorAll('.pslab button, .pslab a')].find(e=>/studi kasus|detail|buka/i.test(e.textContent));(t||document.querySelector('.pslab__body')).click()})()`
);
await new Promise((r) => setTimeout(r, 1200));
console.log(
  "while open:",
  await ev(
    `JSON.stringify({docH:document.documentElement.scrollHeight,bodyH:Math.round(document.body.getBoundingClientRect().height)})`
  )
);
/* instrument the restore: record what the document reports on each frame */
await ev(
  `window.__probe=[];(function f(n){if(n>4)return;window.__probe.push([Math.round(window.scrollY),document.documentElement.scrollHeight]);requestAnimationFrame(()=>f(n+1))})(0)`
);
await ev(`document.querySelector('.dialog__close').click()`);
await new Promise((r) => setTimeout(r, 1200));
console.log("probe [scrollY, docH] per frame:", await ev("JSON.stringify(window.__probe)"));
console.log(
  "after:",
  await ev(
    `JSON.stringify({y:Math.round(window.scrollY),docH:document.documentElement.scrollHeight,projTop:Math.round(document.querySelector('#projects').getBoundingClientRect().top+window.scrollY)})`
  )
);
ws.close();
p.kill();
