const fs = require("fs");
const path = require("path");

const stack_file_name = process.env.STACK_FILE || 'stack.js';
const stack_file = path.resolve(__dirname + "/" + stack_file_name);
const stack_module = require(stack_file)

const push = stack_module.push
const pop = stack_module.pop

test("stack_module does not reference built in push", function() {
  const declaration = fs.readFileSync(stack_file);
  expect(declaration.toString().includes("Array.prototype.push")).toBe(false);
})

test("stack_module does not reference built in pop", function() {
  const declaration = fs.readFileSync(stack_file);
  expect(declaration.toString().includes("Array.prototype.pop")).toBe(false);
})

test("push does not use built in array push", function() {
  var declaration = push.toString();
  declaration = declaration.substring(27); // strip function header
  expect(declaration.includes("push")).toBe(false);
})

test("pop does not use built in array pop", function() {
  var declaration = pop.toString();
  declaration = declaration.substring(21); // strip function header
  expect(declaration.includes("pop")).toBe(false);
})

test("push does not mutate the given array", function(){
  const stack = []
  push(stack, 1);
  expect(stack.length).toBe(0);
})

test("push adds element to the list", function(){
  var stack = [];
  stack = push(stack, 1);
  expect(stack.length).toBe(1);
});

test("pop does not mutate the given array", function(){
  var stack = [1];
  pop(stack);
  expect(stack.length).toBe(1);
})

test("pop removes element from the list", function(){
  var stack = [1, 2];
  stack = pop(stack)[0];
  expect(stack.length).toBe(1);
  stack = pop(stack)[0];
  expect(stack.length).toBe(0);
})

test("pop returns the item that is removed as second element of array", function(){
  var stack = [1];
  expect(pop(stack)[1]).toBe(1);
})

test("pop returns elements in the reverse order that they are pushed", function(){
  var stack = [];
  stack = push(stack, 1);
  stack = push(stack, 2);
  stack = push(stack, 3);
  pop_result = pop(stack);
  stack = pop_result[0];
  expect(pop_result[1]).toBe(3);
  pop_result = pop(stack);
  stack = pop_result[0];
  expect(pop_result[1]).toBe(2);
  pop_result = pop(stack);
  stack = pop_result[0];
  expect(pop_result[1]).toBe(1);
})

test("pop when empty returns undefined item", function(){
  const stack = []
  expect(pop(stack)[1]).toBe(undefined);
})
