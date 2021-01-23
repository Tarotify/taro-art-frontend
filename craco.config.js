const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 自定义
            modifyVars: { '@primary-color': '#bd7cc6' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};