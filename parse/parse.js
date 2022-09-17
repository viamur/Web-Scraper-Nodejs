const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const parse = async (url, indexer) => {
  /**
   * Запускаем Chromium
   */
  const browser = await puppeteer.launch();
  /**
   * Создаём новую страницу.
   */
  const page = await browser.newPage();
  /**
   * Используя новую страницу, переходим на url
   */
  await page.goto(url);
  /**
   * Получим содержимое страницы в виде HTML-кода.
   */
  const content = await page.content();
  /**
   * Загрузим код в cheerio.
   */
  const $ = cheerio.load(content);
  /**
   * Создадим массив для хранения данных
   */
  const data = [];
  /**
   * Работа с элементами, имеющими класс или атрибут indexer.
   * Перебираем их с помощью метода each().
   */
  $(indexer).each((idx, elem) => {
    /**
     * Получаем внутренний HTML-код, соответствующий тексту.
     * Помещаем данные в массив.
     */
    data.push($(elem).text());
  });

  browser.close();
  return data;
};

module.exports = parse;
