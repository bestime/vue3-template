function replaceCssUrl (data, callback) {
  data = data.replace(/(url\s?\(\s?'|")(.*?)('|"\s?\))/g, function (_, prefix, link, suffix) {
    link = callback(link)
    
    return prefix + link + suffix
  })
  return data
}

function tagsUrlReplace (data, callback) {
  data = data.replace(/(<img.* src="\s*)(.*?)(".*?\/\>)/g, function (_, prefix, link, suffix) {
    link = callback(link)
    return prefix + link + suffix
  })
  return data
}

module.exports = function (source) {
  const options = this.getOptions() || {
    config: {}
  }
  if(!options.mode) return source

  const config = options.config
  let main;
  switch (options.mode) {
    case 'css':
      main = replaceCssUrl
      break;
    case 'html':
      main = tagsUrlReplace
      break;
  }
  

  source = main(source, function (path) {
    for (var key in config) {
      var regStr = new RegExp('^' + key + '(?=/|$)')
      path = path.replace(regStr, config[key])
    }
    return path.replace(/^\/\//, '/')
  })
  return source
}