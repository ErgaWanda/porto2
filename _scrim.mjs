const W = 390, H = 844;
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const { spawn } = await import("node:child_process");
const p = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--remote-debugging-port=9244",
  `--user-data-dir=${process.cwd()}\\_ctmpG`, `--window-size=${W},${H}`, "about:blank",
]);
const get = async (u) => {
  for (let i = 0; i < 80; i++) {
    try { const r = await fetch(u); if (r.ok) return r.json(); } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("no devtools");
};
const list = await get("http://127.0.0.1:9244/json/list");
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (m, params = {}) => new Promise((res) => { const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method: m, params })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) pending.get(m.id)(m.result), pending.delete(m.id); };
await new Promise((r) => (ws.onopen = r));
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true })).result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 1 });
await send("Page.navigate", { url: "http://localhost:4321/" });
await new Promise((r) => setTimeout(r, 3200));

const open = async () => {
  await ev(`(()=>{const t=[...document.querySelectorAll('.pslab button, .pslab a')].find(e=>/studi kasus|detail|buka/i.test(e.textContent));(t||document.querySelector('.pslab__body')).click()})()`);
  await new Promise((r) => setTimeout(r, 1200));
};
const isOpen = () => ev(`!!document.querySelector('.dialog')`);
const tap = async (steps) => {
  for (const s of steps) {
    await send("Input.dispatchTouchEvent", {
      type: s.t,
      touchPoints: s.t === "touchEnd" ? [] : [{ x: s.x, y: s.y }],
    });
    await new Promise((r) => setTimeout(r, 60));
  }
};
const scrollBack = async () => {
  await ev(`window.scrollTo({top:7002,behavior:'instant'})`);
  await new Promise((r) => setTimeout(r, 500));
  return ev(`Math.round(window.scrollY)`);
};

await ev(`window.scrollTo({top:7002,behavior:'instant'})`);
await new Promise((r) => setTimeout(r, 600));

/* 1. tap the bare scrim -> must dismiss */
await open();
await tap([{ t: "touchStart", x: 8, y: 700 }, { t: "touchEnd" }]);
await new Promise((r) => setTimeout(r, 700));
console.log("tap on scrim      -> open?", await isOpen(), "scrollY", await scrollBack());

/* 2. drag from inside the body out over the scrim -> must NOT dismiss */
await open();
await tap([
  { t: "touchStart", x: 195, y: 600 },
  { t: "touchMove", x: 195, y: 500 },
  { t: "touchMove", x: 195, y: 400 },
  { t: "touchMove", x: 12, y: 380 },
  { t: "touchEnd" },
]);
await new Promise((r) => setTimeout(r, 700));
console.log("drag body->scrim  -> open?", await isOpen(), "scrollY", await scrollBack());

/* 3. drag entirely across the bare scrim (swipe past) -> must NOT dismiss */
await open();
await tap([
  { t: "touchStart", x: 8, y: 300 },
  { t: "touchMove", x: 8, y: 620 },
  { t: "touchEnd" },
]);
await new Promise((r) => setTimeout(r, 700));
console.log("swipe on scrim    -> open?", await isOpen(), "scrollY", await scrollBack());

/* 4. close button */
await ev(`document.querySelector('.dialog__close').click()`);
await new Promise((r) => setTimeout(r, 700));
console.log("close button      -> open?", await isOpen(), "scrollY", await scrollBack());
ws.close(); p.kill();
