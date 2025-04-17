const { Builder, By, until } = require("selenium-webdriver");
const assert = require('assert');

describe('Google Search Test', function() {
    let driver;

    it('Visit SauceDemo dan cek page title', async function () {
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com/');
        const title = await driver.getTitle();
        
        //Check Login Succes
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'));
        let buttonLogin = await driver.findElement(By.xpath('//*[@id="login-button"]'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        let textAppLogo = await driver.findElement(By.xpath('//*[@id="header_container"]/div[1]/div[2]/div'));
        let logotext = await textAppLogo.getText();
        assert.strictEqual(title, 'Swag Labs');

        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="shopping_cart_container"]/a')),
            2000
        );

        await buttonCart.isDisplayed();

        // Dropdown "Sort By"
        let dropdown = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="header_container"]/div[2]/div/span/select')), 
            2000);

        let sortDropdown = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select'));

        // Sort By "A to Z" 
        await sortDropdown.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select/option[1]')).click();
    
        await driver.sleep(2000);

        // Sort By "Z to A"
        await sortDropdown.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select/option[2]')).click();
    
        await driver.sleep(2000);
      
        await driver.sleep(3000);
        await driver.quit();
    })
});
