const yargs = require("yargs");

exports.init = function(contactService) {
  yargs
    .command({
      command: 'add',
      desc: 'Add contact',
      builder: (ygs) => {
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
      handler: argv => contactService.add(argv.firstName, argv.lastName, () => {
        contactService.print();
      })
    })
    .command({
      command: 'delete',
      desc: 'Delete contact',
      builder: (ygs) => {
        ygs
          .option('id', {
            alias: 'i',
            desc: 'Contact\'s id',
            demand: true,
            type: 'string'
          })
      },
      handler: argv => contactService.delete(Number(argv.id), () => {
        contactService.print();
      })
    })
    .help()
    .argv;
}
