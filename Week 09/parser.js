const EOF = Symbol("EOF");
function parseHTML(html) {
  let state = data;
  let str = "";
  for (let c of html) {
    state = state(c);
    str += c;
  }
  console.log(str);
  state = state(EOF);
}

function data(c) {
  // ''
  if (c === "<") {
    return tagOpen;
  } else if (c === EOF) {
    return;
  } else {
    return data;
  }
}

function tagOpen(c) {
  //<
  if (c === "/") {
    return endTagOpen;
  } else if (c.match(/^[!a-zA-Z]$/)) {
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c) {
  //</
  if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c);
  } else if (c === ">") {
    //err
  } else if (c === EOF) {
    //err
  } else {
  }
}

function tagName(c) {
  //</, <
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName;
  } else if (c === ">") {
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === ">") {
    return data;
  } else if (c === "=") {
    return beforeAttributeName;
  } else {
    return beforeAttributeName;
  }
}

function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.selfClosing = true;
    return data;
  } else if (c === "EOF") {
  } else {
  }
}

module.exports = {
  parseHTML,
};
