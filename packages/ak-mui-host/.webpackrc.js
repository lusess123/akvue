import { resolve } from 'path';

export default {
  alias: {
    components: resolve(__dirname, './components'),
  },
  extraBabelIncludes:[
        './node_modules/ddd/index.tsx',
        './../ak-lib-antd/src/pro/TagSelect/index.jsx'
  ],
  
  extraBabelPlugins: [
   
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
  ],
  "theme": {
    "primary-color": "#1bab5b"
    }
};
