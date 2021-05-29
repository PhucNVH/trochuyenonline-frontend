import { chromeDriver } from '../utils';
import { By, until } from 'selenium-webdriver';
import sleep from 'sleep';

describe('Login', () => {
  let driver;

  beforeAll(async () => {
    driver = chromeDriver;
    await driver.get(`http://localhost:3000/dang-nhap`);
    const username = await driver.findElement(By.id('normal_login_username'));
    const password = await driver.findElement(By.id('normal_login_password'));
    username.sendKeys('creast');
    password.sendKeys('12345');
    const login_button = driver.findElement(By.css('button.login-form-button'));
    await login_button.click();
    sleep.sleep(2);
  }, 10000);

  beforeEach(async () => {
    await driver.get(`http://localhost:3000/tro-chuyen`);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  // test('Checking Profile Sidebar Displayed On Normal Screen', async () => {
  //   const profile_sidebar = await driver.findElement(
  //     By.className(`ProfileInfo`)
  //   );
  //   expect(profile_sidebar.isDisplayed()).toBeTruthy();
  // }, 10000);

  // test('Checking Chat Area With Bot', async () => {
  //   const button = await driver.findElement(
  //     By.xpath(`//div[@title="Chat với bot"]`)
  //   );
  //   await button.click();
  //   sleep.sleep(2);
  //   const name = await driver.findElement(By.id(`username`)).getText();
  //   expect(name).toBe('Chatbot');
  // }, 10000);

  // test('Checking Send Message to Bot', async () => {
  //   const button = await driver.findElement(
  //     By.xpath(`//div[@title="Chat với bot"]`)
  //   );
  //   await button.click();
  //   sleep.sleep(2);
  //   const message_input = await driver.findElement(By.id(`text-input`));
  //   message_input.sendKeys('Chào bạn');
  //   await driver.findElement(By.id(`text-send-button`)).click();
  //   sleep.sleep(2);
  //   expect(true);
  // }, 10000);

  // test('Checking Bot Reply', async () => {
  //   const button = await driver.findElement(
  //     By.xpath(`//div[@title="Chat với bot"]`)
  //   );
  //   await button.click();
  //   sleep.sleep(2);
  //   const message_input = await driver.findElement(By.id(`text-input`));
  //   message_input.sendKeys('Chào bạn');
  //   await driver.findElement(By.id(`text-send-button`)).click();
  //   sleep.sleep(2);
  //   expect(true);
  // }, 10000);
});
