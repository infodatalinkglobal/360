const {chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3000');
const widget=page.frameLocator('iframe[title="360 Yield Radio Ghana live stream player"]');
await widget.locator('iframe').waitFor({timeout:30000});
await page.screenshot({path:'checks/caster-home.png',fullPage:true});
console.log('iframes',page.frames().map(f=>f.url()));
for(const f of page.frames()){if(f.url().includes('widgets.cloud.caster.fm')){console.log('provider text',await f.locator('body').innerText({timeout:25000}));}}
for(const width of [360,390,414,1440]){await page.setViewportSize({width,height:900});for(const path of ['/live','/']){await page.goto('http://127.0.0.1:3000'+path);await page.frameLocator('iframe[title="360 Yield Radio Ghana live stream player"]').locator('iframe').waitFor({timeout:30000});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error('Overflow '+width+path);}}
await page.goto('http://127.0.0.1:3000/live');await page.getByRole('link',{name:'Home',exact:true}).first().click();await page.frameLocator('iframe[title="360 Yield Radio Ghana live stream player"]').locator('iframe').waitFor({timeout:30000});await page.getByRole('button',{name:'Reload player',exact:true}).click();await page.frameLocator('iframe[title="360 Yield Radio Ghana live stream player"]').locator('iframe').waitFor({timeout:30000});console.log('errors',errors);await browser.close();if(errors.length)process.exit(1)})();
