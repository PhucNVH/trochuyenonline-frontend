// import {
//   chromeDriver,
//   getElementById,
//   getElementByName,
//   getElementByXpath,
// } from '../utils';
// import { By } from 'selenium-webdriver';

// describe('HomePage', () => {
//   let driver;

//   beforeAll(async () => {
//     driver = chromeDriver;
//   }, 1000);

//   beforeEach(async () => {
//     await driver.get(`http://localhost:3000`);
//   }, 10000);

//   afterAll(async () => {
//     await driver.quit();
//   }, 15000);

//   test('Title Check', async () => {
//     const h1 = await driver.findElement(By.css('h1'));
//     const title = await h1.getText();
//     expect(title).toEqual('Trò chuyện online');
//   }, 10000);

//   test('Link Check', async () => {
//     const title = await driver.findElement(By.css('h1'));
//     await title.click();
//     const currentUrl = await driver.getCurrentUrl();
//     expect(currentUrl).toContain('dang-nhap');
//   }, 10000);

//   test('Button Check', async () => {
//     const button = await driver.findElement(By.css('button.HomeButton'));
//     await button.click();
//     const currentUrl = await driver.getCurrentUrl();
//     expect(currentUrl).toContain('dang-nhap');
//   }, 10000);
// });
