const puppeteer = require('puppeteer');

const pdf = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  /* Сохраняем стр в пдф файле */
  await page.pdf({ path: 'public/hn.pdf', format: 'a4' });
  await browser.close();
};

module.exports = pdf;
