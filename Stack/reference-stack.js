function push(stack, item) {
  var new_stack = []
  for(var i = 0; i < stack.length; i++) {
    new_stack[i] = stack[i];
  }
  new_stack[stack.length] = item;
  return new_stack;
}

function pop(stack) {
  var new_stack = [];
  for(var i = 0; i < stack.length - 1; i++) {
    new_stack[i] = stack[i];
  }
  return [new_stack, stack[stack.length - 1]];
}

module.exports = {
  push: push,
  pop: pop
}
