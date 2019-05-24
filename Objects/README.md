# JavaScript Objects and JSON

### Description

JavaScript Objects are similar to HashMaps in Java or Dictionaries in Python.
An Object simply maps a key to a value. This key can be of any simple data type
(number or string). The value can be **any** data type - including another object.

JSON stands for JavaScript Object Notation. It is a lightweight
data-interchange format designed to allow the sending of
objects (compound data) over the internet. Avoiding a discussion of the intricacies
of memory layout, suffice to say that as is, objects cannot be sent over
the internet, from client to server or vice versa. That being said, JSON is
a strict a well-defined series of rules to convert a JavaScript Object to
a string and back, as strings *can* be sent over the internet.

There are two primary operations concerning JSON - **stringify** and **parse**.
Stringify takes a JavaScript Object and converts it to its string representation.
Parse takes a valid JSON string and converts it baack to a JavaScript Object.

For a deeper understanding, additional reading can be found [here](https://www.w3schools.com/js/js_json_intro.asp).

### Examples

```
var jsObject = {}
jsObject["key1"] = "value";
jsObject["key2"] = 2;
console.log(jsObject); # { key1: 'value', key2: 2 }

var nestedObject = {key1: {key2: "value"}}
console.log(nestedObject); # { key1: { key2: 'value' } }
console.log(nestedObject.key1); # { key2: 'value' }
console.log(nestedObject["key1"]); # { key2: 'value' }

var jsonRepresentation = JSON.stringify(jsObject);
console.log(jsonRepresentation); # '{"key1":"value","key2":2}'

var parsedObject = JSON.parse(jsonRepresentation);
console.log(parsedObject); # { key1: 'value', key2: 2 }
```

---

**Important Note:** Despite the fact that the above `jsObject` and
`parsedObject` appear to be equal, they are not as far as JavaScript
is concerned.

```
console.log(jsObject === parsedObject); # false
```

This is due to the fact that the `===` operator simply checks the address
of the object, rather than its fields.

```
var newJsObject = jsObject;
console.log(jsObject === newJsObject); # true
```

In the case of the above, `newJsObject` is assigned to the *same value* as
`jsObject` - in this case, a pointer to the original `{ key1: 'value', key2: 2 }`
object. Since these two variables point to the same location (i.e. contain the
same address), they evaluate as equal. In the former example, `parsedObject`
**does not** point to the same object. It points to a copy of the object
containing the same data. This copy is created during the `JSON.parse()`
function. That being said, two **different** calls to `JSON.parse()` the
same string *also* will not evaluate to true.

```
var obj1 = JSON.parse(jsonRepresentation);
var obj2 = JSON.parse(jsonRepresentation);
console.log(obj1 === obj2); # false
```

## Instructions

Your goal is to fill in the functions given in the `objects.js` file provided
in this directory. Each function provides a description of its intended
operations. To check your solutions, run the pre-defined test cases using
the command `yarn test` within this directory.
