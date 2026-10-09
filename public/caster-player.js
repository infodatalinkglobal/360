// Isolate the vendor's DOM mutations and message listeners from React routing.
// Each page gets a fresh widget document, including its own vendor script.
(() => {
  const container = document.querySelector('.cstrEmbed');
  const status = document.getElementById('widget-status');
  let ready = false;
  function report() {
    if (window.parent !== window) window.parent.postMessage({
      type: '360-caster-size', height: document.body.scrollHeight, ready
    }, window.location.origin);
  }
  new ResizeObserver(report).observe(document.body);
  const observer = new MutationObserver(() => {
    const iframe = container.querySelector('iframe');
    if (!iframe || iframe.dataset.observed) return;
    iframe.dataset.observed = 'true';
    iframe.title = 'Caster.fm live stream controls';
    iframe.allow = 'autoplay';
    iframe.addEventListener('load', () => {
      ready = true;
      status.textContent = '';
      report();
    });
  });
  observer.observe(container, {childList:true, subtree:true});
  setTimeout(() => {
    if (!ready) {
      status.textContent = 'The player is taking longer to load. Check your connection or allow Caster.fm in your content blocker, then reload.';
      report();
    }
  }, 15000);
  report();
})();
