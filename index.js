const puppeteer = require('puppeteer');

// TODO: Split the form sections into their own fns

(async () => {
  // Initial browser configuration
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();
  await page.goto('https://www.bestbuy.com/site/beats-by-dr-dre-powerbeats-pro-totally-wireless-earphones-black/6341988.p', {
    waitUntil: 'networkidle2'
  });
    
  // add to cart button 
  await page.waitForSelector(".fulfillment-add-to-cart-button").then(() => console.log("Reaching website..."))
  await page.evaluate(() => document.getElementsByClassName("btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button")[0].click());
  
  // (METHOD 1 to click a button) -> let the modal with cart load and the click the "Go To Cart" button
  await page.waitForTimeout(5000)
  await page.waitForSelector(".c-button-secondary").then(() => console.log("Item added to the cart"));
  await page.$eval("a[class='c-button c-button-secondary btn btn-secondary btn-sm c-button-sm btn-block c-button-block ']", elem => elem.click());

  // (METHOD 2 to click a button) -> wait for the cart to fully load and click Pay
  await page.waitForSelector(".checkout-buttons__checkout").then(() => console.log("Cart loaded"));
  await page.evaluate(() => document.getElementsByClassName('btn btn-lg btn-block btn-primary')[0].click());

  
  
  
  
  // Fill in the sign-in form
  await page.waitForSelector("#fld-e").then(() => console.log("Signing in..."))
  await page.waitForTimeout(1000)
  await page.type("#fld-e", "oleivahn@gmail.com", {delay: 100});
  await page.type("input[id='fld-p1']", "Astroboy23!!", {delay: 100});
  await page.evaluate(() => document.getElementsByClassName("cia-form__controls__submit")[0].click());
  
  // // IF THIS BUTTON SHOWS
  // try {
  //   await page.waitForSelector(".ispu-card__switch").then(() => console.log("Cart loaded"));
  //   await page.evaluate(() => document.getElementsByClassName('ispu-card__switch')[0].click());
  // } catch (error) {
  //   console.log(`There was an error on the page: ${error}`)
  // }


  // Fill shipping information
  await page.waitForSelector(".streamlined__shipping").then(() => console.log("Filling shipping information..."))

  await page.type("input[id='consolidatedAddresses\.ui_address_2\.firstName']", "Omar", {delay: 100});
  await page.type("input[id='consolidatedAddresses\.ui_address_2\.lastName']", "Leiva", {delay: 100});
  await page.type("input[id='consolidatedAddresses\.ui_address_2\.street']", "7505 Ashby Ln", {delay: 100});
  await page.evaluate(() => document.getElementsByClassName("address-form__showAddress2Link")[0].click());
  await page.waitForTimeout(1000)
  await page.type("input[id='consolidatedAddresses\.ui_address_2\.street2']", "Unit K", {delay: 100});
  await page.type("input[id='consolidatedAddresses\.ui_address_2\.city']", "Alexandria", {delay: 100});
  await page.select("select[id='consolidatedAddresses\.ui_address_2\.state']", "VA");
  await page.type("input[id='consolidatedAddresses\.ui_address_2\.zipcode']", "22315", {delay: 100});
  await page.evaluate(() => document.getElementsByClassName("btn btn-lg btn-block btn-secondary")[0].click());
  

  // await browser.close();
})();