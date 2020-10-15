# DISCLAIMER
While some newer features are kept intact, A LOT of the base code has been changed. Please use the updated boilerplate from the Idiot's guide community as this is a considerably stripped down version. The modified boilerplate is essentially an recreation of an older version that I am more used to. This is not a replacement for the current boilerplate as it is mainly used for my personal projects. This will rarely be updated.

## boilerplate.js
A modified discord bot boilerplate. Forked from [An Idiot's Guide's boilerplate](https://github.com/AnIdiotsGuide/guidebot).

### Changelog

**Major Changes:**
* Added `setactivity`, `setstatus`, `info`, `pfp`, `settings` and `echo` commands
* Replaced all enmaps (Commands are a discord collection)
* Replaced client.loadCommand() function with client.reload() (See modules/funtions.js)
* Removed `better-sqlite3`, `chalk`, `enmap`, and `inquirer` as dependencies
* Removed Logger module (replaced with console.log())
* Removed conf and set command files
* Removed 'setup.js' and npm postinstall script
* Removed perm levels 2,3,8,9 from config example


**Minor Changes:**
* Changed intents to 4 spaces
* Removed most comments
* Ignored .gitignore
