// 使い方: NODE_PATH=$(npm root -g) node render.js <data.json> <out.png>
// iPhone 13（1170×2532）。時計・ウィジェット（上〜37%）とライト/カメラ（下87%〜）を避けて表を置く
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
(async () => {
  const [dataPath, outPath] = process.argv.slice(2);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
    .replace('<script>', '<script>window.__DATA__=' + JSON.stringify(data) + ';</script><script>');
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  await p.setContent(tpl); await p.waitForTimeout(500);
  const [ul, card] = await p.evaluate(() => [document.querySelector('ul').scrollHeight, document.querySelector('.card').clientHeight]);
  console.log(ul + 40 > card ? 'OVERFLOW: 行を減らすか短くする' : 'OK', ul, card);
  await p.screenshot({ path: outPath }); await b.close();
})();
