function camelToDash(str) {
  return str.replace(/\W+/g, '-')
      .replace(/([a-z\d])([A-Z])/g, '$1-$2');
}

function dashToCamel(str) {
  return str.replace(/\W+(.)/g, function (x, chr) {
    return chr.toUpperCase();
  })
}