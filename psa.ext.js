var numberToStartOn = 4;
var excluded = [
  /^00/,
  /^88/,
  /^info/,
  /^o_/
];

var userRoles = message.author.roles;

var adminRole = svr.roles.getByName('ADMIN');
var moderatorRole = svr.roles.getByName('Modd');

if (moderatorRole && moderatorRole.id in userRoles || adminRole && adminRole.id in userRoles) {
  for (var i = numberToStartOn; i < svr.channels.length; i++) {
    var channel = svr.channels[i], name = channel.name, isExcluded = false;
    for (var j = 0; j < excluded.length; j++) {
      if (name.match(excluded[j])) {
        isExcluded = true;
        break;
      }
    }
    if (!isExcluded) {
      channel.sendMessage(message.suffix);
    }
  }
}
