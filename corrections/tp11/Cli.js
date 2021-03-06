const web = require('./Server');
const yargs = require('yargs');

exports.init = function (myContacts) {
  yargs
    .version('0.0.0')
    .option('c', {
      alias: 'colors',
      desc: 'Use colors in console'
    })
    .help()
    .global('c')

  yargs
    .command({
       command: 'list',
       aliases: 'ls',
       desc: 'List all contacts',
       handler: () => myContacts.print()
     })
    .command({
      command: 'add',
      desc: 'Add contact',
      builder: ygs => {
        ygs
          .option('firstName', {
            alias: 'f',
            desc: 'Contact\'s first name',
            demand: true,
            type: 'string'
          })
          .option('lastName', {
            alias: 'l',
            desc: 'Contact\'s last name',
            demand: true,
            type: 'string'
          })
      },
      handler: argv => myContacts.add(argv.firstName, argv.lastName, () => myContacts.print())
    })
    .command({
      command: 'delete',
      desc: 'Delete contact',
      builder: ygs => {
        ygs
          .option('id', {
            alias: 'i',
            desc: 'Contact\'s id',
            demand: true,
            type: 'number'
          })
      },
      handler: argv => myContacts.delete(argv.id, () => myContacts.print())
    })
    .command({
      command: 'watch',
      desc: 'Watch contacts',
      handler: () => myContacts.watch()
    })
    .command({
      command: 'serve',
      desc: 'Launch Express',
      builder: ygs => {
        ygs
          .option('cluster', {
            desc: 'Set how many workers to start',
            type: 'number'
          })
      },
      handler: argv => {
        const workers = parseInt(argv.cluster)

        if (isNaN(workers)) {
          web(myContacts, 1)
        } else {
          web(myContacts, workers)
        }
      }
    })

  yargs.parse(process.argv);
}
