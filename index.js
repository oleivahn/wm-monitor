const puppeteer = require("puppeteer");
require("dotenv").config();

// TODO: Split the form sections into their own functions

(async () => {
  // Initial browser configuration
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open browser and navigate to URL
  const page = await browser.newPage();
  await page.goto(
    "https://www.bestbuy.com/site/beats-by-dr-dre-powerbeats-pro-totally-wireless-earphones-black/6341988.p",
    { timeout: 120000 }
  );

  // console.log(process.env);

  // Add to cart button
  await page
    .waitForSelector(".fulfillment-add-to-cart-button")
    .then(() => console.log("Entering website..."));
  await page.evaluate(() =>
    document
      .getElementsByClassName(
        "btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button"
      )[0]
      .click()
  );

  // Go to cart
  // (METHOD 1 to click a button - $EVAL) -> let the modal with cart load and the click the "Go To Cart" button
  await page.waitForTimeout(5000);
  await page
    .waitForSelector(".c-button-secondary")
    .then(() => console.log("Item added to the cart..."));
  await page.$eval(
    "a[class='c-button c-button-secondary btn btn-secondary btn-sm c-button-sm btn-block c-button-block ']",
    (elem) => elem.click()
  );

  // Checkout
  // (METHOD 2 to click a button  - EVALUATE) -> wait for the cart to fully load and click Pay
  await page
    .waitForSelector(".checkout-buttons__checkout")
    .then(() => console.log("Cart loaded..."));
  await page.evaluate(() =>
    document
      .getElementsByClassName("btn btn-lg btn-block btn-primary")[0]
      .click()
  );

  // Fill in the sign-in form
  await page.waitForSelector("#fld-e").then(() => console.log("Signing in..."));
  await page.waitForTimeout(1000);
  await page.type("#fld-e", process.env.USER_NAME, { delay: 100 });
  await page.type("input[id='fld-p1']", process.env.USER_PW, { delay: 100 });
  await page.evaluate(() =>
    document.getElementsByClassName("cia-form__controls__submit")[0].click()
  );

  // Fill shipping information
  await page
    .waitForSelector(".streamlined__shipping")
    .then(() => console.log("Filling shipping information..."));

  await page.type(
    "input[id='consolidatedAddresses.ui_address_2.firstName']",
    process.env.FIRST_NAME,
    { delay: 100 }
  );
  await page.type(
    "input[id='consolidatedAddresses.ui_address_2.lastName']",
    process.env.LAST_NAME,
    { delay: 100 }
  );
  await page.type(
    "input[id='consolidatedAddresses.ui_address_2.street']",
    process.env.ADDRESS_1,
    { delay: 100 }
  );
  await page.evaluate(() =>
    document.getElementsByClassName("address-form__showAddress2Link")[0].click()
  );
  await page.waitForTimeout(1000);
  await page.type(
    "input[id='consolidatedAddresses.ui_address_2.street2']",
    process.env.ADDRESS_2,
    { delay: 100 }
  );
  await page.type(
    "input[id='consolidatedAddresses.ui_address_2.city']",
    process.env.CITY,
    { delay: 100 }
  );
  await page.select(
    "select[id='consolidatedAddresses.ui_address_2.state']",
    process.env.STATE
  );
  await page.type(
    "input[id='consolidatedAddresses.ui_address_2.zipcode']",
    process.env.ZIP_CODE,
    { delay: 100 }
  );
  // await page.type("input[id='fulfillment_1losOne Day1']", process.env.ZIP_CODE, {delay: 100});
  // await page.evaluate(() => document.getElementById("fulfillment_1losOne Day1").click());
  await page.evaluate(() =>
    document
      .getElementsByClassName("btn btn-lg btn-block btn-secondary")[0]
      .click()
  );

  // Fill payment information
  await page
    .waitForSelector(".payment__cc-label")
    .then(() => console.log("Filling payment information..."));

  await page.type("input[id='optimized-cc-card-number']", process.env.CC_INFO, {
    delay: 100,
  });
  await page.select("select[name='expiration-month']", process.env.EXP_MONTH);
  await page.select("select[name='expiration-year']", process.env.EXP_YEAR);
  await page.type("input[id='credit-card-cvv']", process.env.SEC_CODE, {
    delay: 100,
  });
  await page.evaluate(() =>
    document
      .getElementsByClassName("btn btn-lg btn-block btn-primary")[0]
      .click()
  );

  // await browser.close();
})();
