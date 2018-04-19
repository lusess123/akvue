export default function (webpackConfig, {webpack}) {
  //webpackConfig.module.rules[0].exclude = undefined; /\.(ts|tsx)$/
  var tss = webpackConfig
    .module
    .rules
    .filter(a => {
      const s = escape((a.test
        ? a.test
        : ""));
      return s == escape("/\\.(ts|tsx)$/") 

    });
  // console.log(tss); var ts = webpackConfig.module.rules.filter(a=> {return
  // (a.test?a.test:"").toString() == "/\.(ts|tsx)$/"})[0];
  if (tss.length > 0) {
    // var ts = tss[0]; ts.exclude = undefined;
    tss.forEach(t => t.exclude = undefined)
  }
  //  ts.include =
  // [ts.include,"/Users/zyking/Documents/work/lvwwork/akvue/packages/ak-mui-host/n
  // ode_modules/ddd/index.tsx"]
  console.log(tss)
  // return null;
  return webpackConfig;
}