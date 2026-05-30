import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[Browser Console Error] ${msg.text()}`);
  });

  try {
    console.log('Navigating to http://localhost...');
    await page.goto('http://localhost', { timeout: 10000 });

    // Inspection 1: Start Free Button
    console.log('\n--- Checking Start Free Button ---');
    const startFreeBtn = await page.getByText('Start Free', { exact: false }).first();
    if (await startFreeBtn.isVisible()) {
        const href = await startFreeBtn.getAttribute('href');
        console.log(`'Start Free' button found. Href attribute: "${href}"`);
        // Check if it's a link or button
        const tagName = await startFreeBtn.evaluate(el => el.tagName);
        console.log(`Element tag: ${tagName}`);
    } else {
        console.error("'Start Free' button NOT found.");
    }

    // Inspection 2: Footer Links
    console.log('\n--- Checking Footer Links ---');
    const footerLinks = await page.locator('footer a').all();
    console.log(`Found ${footerLinks.length} links in footer.`);
    
    for (const link of footerLinks) {
        const text = (await link.innerText()).trim();
        const href = await link.getAttribute('href');
        console.log(`Link: "${text}" -> "${href}"`);
    }

    // Inspection 3: Check for Broken Links (Simple grep)
    // Identify links with '#' or empty hrefs
    const brokenLinks = await page.locator('a[href="#"], a:not([href])').all();
    if (brokenLinks.length > 0) {
        console.log(`\nFound ${brokenLinks.length} potentially broken links (href="#" or missing).`);
    }

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
