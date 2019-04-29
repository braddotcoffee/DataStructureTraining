# Queue

### Description

A queue is often described as a first-in-first-out structure. This means that
the first items that are "enqueued" into the structure are the first items
to be "dequeued" out. These are the two primary operations defined on a queue.
**Enqueue** will add an item to the structure, **dequeue** will remove the item
which has been in the queue the longest. For a deeper understanding, additional
reading can be found [here](https://www.studytonight.com/data-structures/queue-data-structure).

### Examples

```
queue = []
enqueue(queue, 1); // [1]
enqueue(queue, 2); // [1, 2]
enqueue(queue, 3); // [1, 2, 3]
dequeue(queue); // [2, 3], returns 1
dequeue(queue); // [3], returns 2
dequeue(queue); // [], returns 3
```

**OR**

```
queue = []
enqueue(queue, 1); // [1]
enqueue(queue, 2); // [2, 1]
enqueue(queue, 3); // [3, 2, 1]
dequeue(queue); // [3, 2], returns 1
dequeue(queue); // [3], returns 2
dequeue(queue); // [], returns 3
```

## Instructions

Your goal is to define these functions within the `queue.js` file. **Do not** use
the JavaScript `array.push()` or `array.shift()` functions within your
implementation, as this defeats the purpose of the exercise. Treat the given
arrays as though they are immutable. To check your solutions, run the pre-defined
test cases using the command `jest` within this directory

