function enqueue(queue, item) {
  var new_queue = [];
  for(var i = 0; i < queue.length; i++) {
    new_queue[i] = queue[i];
  }
  new_queue[queue.length] = item;
  return new_queue;
}

function dequeue(queue) {
  var new_queue = [];
  for(var i = 1; i < queue.length; i++) {
    new_queue[i - 1] = queue[i];
  }
  return [new_queue, queue[0]]
}

module.exports = {
  enqueue: enqueue,
  dequeue: dequeue
}
