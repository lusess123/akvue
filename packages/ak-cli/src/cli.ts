import  * as  commander from 'commander' 

commander
  .version('0.0.1')
  .option('-react, --react', '生成react页面')
  .option('-vue, --vue', '生成vue页面')
  .option('-ng, --ng', '生成angular页面')
  .parse(process.argv);

if (!commander.args.length) commander.help();