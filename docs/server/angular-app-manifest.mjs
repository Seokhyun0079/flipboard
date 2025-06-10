
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/flipboard/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/flipboard"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 616, hash: '46f7834f63d873e0fbac352c7f70891da92001aad73b1e4b31a18a7137dfa3b1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 957, hash: 'ade0458c5d900a24db7c8794b10548726d948c382228d987cbb1229ee714f106', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6659, hash: 'f122f39ed3bd98e3c77c81b95ddfd784b6f8dcea50e6aeaa14a242399fbbb403', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-MJYQKVEO.css': {size: 140, hash: 'YxWHju2mGro', text: () => import('./assets-chunks/styles-MJYQKVEO_css.mjs').then(m => m.default)}
  },
};
