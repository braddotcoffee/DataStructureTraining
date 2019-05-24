const fs = require("fs");
const path = require("path");

const queue_file_name = process.env.QUEUE_FILE || 'queue.js';
const queue_file = path.resolve(__dirname + "/" + queue_file_name);
const queue_module = require(queue_file);

const enqueue = queue_module.enqueue
const dequeue = queue_module.dequeue

test("queue_module does not reference built in push", function() {
  const declaration = fs.readFileSync(queue_file);
  expect(declaration.toString().includes("Array.prototype.push")).toBe(false);
})

test("queue_module does not reference built in shift", function() {
  const declaration = fs.readFileSync(queue_file);
  expect(declaration.toString().includes("Array.prototype.shift")).toBe(false);
})

test("enqueue does not use built in array push", function() {
  var declaration = enqueue.toString();
  declaration = declaration.substring(31); // strip function header
  expect(declaration.includes("push")).toBe(false);
})

test("dequeue does not use built in array shift", function() {
  var declaration = dequeue.toString();
  declaration = declaration.substring(25); // strip function header
  expect(declaration.includes("shift")).toBe(false);
})

test("enqueue does not mutate the given array", function(){
  const queue = []
  enqueue(queue, 1);
  expect(queue.length).toBe(0);
})

test("enqueue adds element to the list", function(){
  var queue = []
  queue = enqueue(queue, 1);
  expect(queue.length).toBe(1);
})

test("dequeue does not mutate the given array", function(){
  var queue = [1];
  dequeue(queue);
  expect(queue.length).toBe(1);
})

test("dequeue removes element from the list", function(){
  var queue = [1, 2];
  queue = dequeue(queue)[0];
  expect(queue.length).toBe(1);
  queue = dequeue(queue)[0];
  expect(queue.length).toBe(0);
})

test("dequeue returns the item that is removed as the second element of the array", function() {
  var queue = [1];
  expect(dequeue(queue)[1]).toBe(1);
})

test("dequeue returns the items in the order they were enqueued", function(){
  var queue = [];
  queue = enqueue(queue, 1);
  queue = enqueue(queue, 2);
  queue = enqueue(queue, 3);
  dequeue_result = dequeue(queue);
  queue = dequeue_result[0];
  expect(dequeue_result[1]).toBe(1);
  dequeue_result = dequeue(queue);
  queue = dequeue_result[0];
  expect(dequeue_result[1]).toBe(2);
  dequeue_result = dequeue(queue);
  queue = dequeue_result[0];
  expect(dequeue_result[1]).toBe(3);
})

test("dequeue when empty returns undefined item", function() {
  const queue = [];
  expect(dequeue(queue)[1]).toBe(undefined);
})
