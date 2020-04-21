import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  taskQueue: 'async',
  outputTargets: [{
    type: 'www',
    baseUrl: 'https://192.168.0.199:8080/',
    serviceWorker: {
      swSrc: 'src/sw.js'
    }
  }],
};
