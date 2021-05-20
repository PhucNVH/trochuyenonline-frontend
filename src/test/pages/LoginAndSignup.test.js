import { chromeDriver } from '../utils';
import { By, until } from 'selenium-webdriver';
import sleep from 'sleep';

describe('Login', () => {
  let driver;

  beforeAll(async () => {
    driver = chromeDriver;
  }, 1000);

  beforeEach(async () => {
    await driver.get(`http://localhost:3000/dang-nhap`);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  // test('Title Check', async () => {
  //   const h1 = await driver.findElement(By.css('h1'));
  //   const title = await h1.getText();
  //   expect(title).toEqual('Trò chuyện online');
  // }, 10000);

  // test('Login Check', async () => {
  //   const username = await driver.findElement(By.id('normal_login_username'));
  //   const password = await driver.findElement(By.id('normal_login_password'));
  //   username.sendKeys('creast');
  //   password.sendKeys('12345');

  //   const login_button = driver.findElement(By.css('button.login-form-button'));
  //   await login_button.click();
  //   sleep.sleep(5);

  // const currentUrl = await driver.getCurrentUrl();
  // expect(currentUrl).toContain('tro-chuyen');
  // }, 10000);

  // test('Navigate Test', async () => {
  //   const signup_button = await driver.findElement(
  //     By.xpath(`//a[@href='/dang-ky']`)
  //   );
  //   await signup_button.click();
  //   await driver.wait(until.urlContains('dang-ky'));
  //   const currentUrl = await driver.getCurrentUrl();
  //   expect(currentUrl).toContain('dang-ky');
  // }, 10000);

  // test('Checking Terms Modal', async () => {
  //   await driver.findElement(By.id(`term-link`)).click();
  //   const term_modal = await driver.findElement(By.id('term-modal'));
  //   expect(term_modal.isDisplayed()).toBeTruthy();
  // }, 10000);

  // test('Checking Animation Displayed', async () => {
  //   const lottie_animation = await driver.findElement(
  //     By.xpath(`//div[@aria-label="animation"]`)
  //   );
  //   expect(lottie_animation.isDisplayed()).toBeTruthy();
  // }, 10000);
});
