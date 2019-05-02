# Stack

### Description

A stack is often described as a last-in-first-out structure. This means that
the first items that are "pushed" into the structure are the last "popped"
out. These are the two primary operations defined on a stack. **Push** will add
an item to the structure, **pop** will remove the most recently added item from
the structure. For a deeper understanding, additional reading can be found
[here](https://www.studytonight.com/data-structures/stack-data-structure).

### Examples

```
stack = []
push(stack, 1); // [1]
push(stack, 2); // [1, 2]
push(stack, 3); // [1, 2, 3]
pop(stack);     // [1 ,2], returns 3
pop(stack);     // [1], returns 2
pop(stack);     // [], returns 1
```

**OR**

```
stack = []
push(stack, 1); // [1]
push(stack, 2); // [2, 1]
push(stack, 3); // [3, 2, 1]
pop(stack);     // [2, 1], returns 3
pop(stack);     // [1], returns 2
pop(stack);     // [], returns 1
```

## Instructions

Your goal is to define these functions within the `stack.js` file. **Do not** use the JavaScript `array.push()`
and `array.pop()` functions within your implementation, as this defeats the purpose of the exercise.
Treat the given arrays as though they are immutable.
To check your solutions, run the pre-defined test cases using the command `yarn test` within this directory.
