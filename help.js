module.exports = {
    'help': 
    {
         description: 'Shows the list of commands or help on specified command.',
        format: 'help [command-name]'
    },

    'ping': 
    {
        description: 'Checks connectivity with discord\'s servers.',
        format: 'ping'
    },

    'say': 
    {
        aliases: ['repeat'],
        description: 'Repeats whatever is said.',
        format: 'say <message>'
    },

    'random': 
    {
        description: 'Generate a random interger between 1 and the establised value.',
        format: 'random <value>'
    }
  }