export const INITIAL_QUIZZES = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals & ES6+",
    description: "Deep dive into JS prototypes, closures, event loop, hoisting, coercion, and modern ES6+ features.",
    category: "JavaScript",
    difficulty: "Intermediate",
    timeLimit: 15, // in minutes
    passingScore: 75, // percentage
    icon: "Code2",
    questions: [
      {
        id: "js-1",
        questionText: "What is the output of the following JavaScript code snippet?",
        codeSnippet: `console.log(typeof null);
console.log(typeof undefined);
console.log(null === undefined);`,
        options: [
          "'object', 'undefined', false",
          "'null', 'undefined', true",
          "'object', 'undefined', true",
          "'null', 'null', false"
        ],
        correctAnswer: "A",
        explanation: "In JavaScript, `typeof null` returns 'object' (a historical bug preserved for compatibility), `typeof undefined` is 'undefined', and strict equality `null === undefined` is false because their types differ.",
        points: 1
      },
      {
        id: "js-2",
        questionText: "What will be printed to the console when the following code runs?",
        codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
        options: [
          "0, 1, 2",
          "3, 3, 3",
          "undefined, undefined, undefined",
          "0, 0, 0"
        ],
        correctAnswer: "B",
        explanation: "Because `var` has function scope (not block scope), the variable `i` is shared across all iterations. By the time the `setTimeout` callbacks execute, `i` has reached 3.",
        points: 1
      },
      {
        id: "js-3",
        questionText: "What does the following expression evaluate to in JavaScript?",
        codeSnippet: `console.log([] + [] === "");
console.log([] + {} === "[object Object]");`,
        options: [
          "false, false",
          "true, true",
          "true, false",
          "false, true"
        ],
        correctAnswer: "B",
        explanation: "Adding two empty arrays results in an empty string `\"\"` via `toString()`. Adding an empty array to an object converts the object to `\"[object Object]\"`, resulting in `\"[object Object]\"`.",
        points: 1
      },
      {
        id: "js-4",
        questionText: "What is the output of the following promise chain?",
        codeSnippet: `Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error('fail'); })
  .catch(err => 5)
  .then(x => x + 1)
  .then(console.log);`,
        options: [
          "Error: fail",
          "6",
          "2",
          "undefined"
        ],
        correctAnswer: "B",
        explanation: "The error is caught by `.catch()`, which returns 5. The subsequent `.then()` receives 5 and computes 5 + 1 = 6.",
        points: 1
      },
      {
        id: "js-5",
        questionText: "What will the following closure invocation log?",
        codeSnippet: `const fn = (function() {
  let count = 0;
  return () => ++count;
})();

console.log(fn(), fn(), fn());`,
        options: [
          "1 1 1",
          "1 2 3",
          "0 1 2",
          "NaN NaN NaN"
        ],
        correctAnswer: "B",
        explanation: "The IIFE creates a lexical closure enclosing `count`. Each call increments `count` and returns the new value (1, 2, 3).",
        points: 1
      },
      {
        id: "js-6",
        questionText: "Which statement best describes the execution order of Microtasks vs Macrotasks in the Node/Browser Event Loop?",
        codeSnippet: `setTimeout(() => console.log('Macro'), 0);
Promise.resolve().then(() => console.log('Micro'));
console.log('Sync');`,
        options: [
          "Sync -> Macro -> Micro",
          "Sync -> Micro -> Macro",
          "Micro -> Sync -> Macro",
          "Macro -> Sync -> Micro"
        ],
        correctAnswer: "B",
        explanation: "Synchronous code executes first ('Sync'). Then, all queued microtasks (Promises, queueMicrotask) run before macrotasks (setTimeout, setInterval), outputting 'Sync' -> 'Micro' -> 'Macro'.",
        points: 1
      },
      {
        id: "js-7",
        questionText: "What does the following snippet output regarding object property lookup?",
        codeSnippet: `const obj = { a: 1 };
const clone = Object.assign({}, obj);
const spread = { ...obj };

obj.a = 2;
console.log(clone.a, spread.a);`,
        options: [
          "2 2",
          "1 1",
          "1 2",
          "undefined undefined"
        ],
        correctAnswer: "B",
        explanation: "Both `Object.assign` and spread `{ ...obj }` create shallow copies of primitive values. Modifying `obj.a` afterwards does not affect the copied objects.",
        points: 1
      },
      {
        id: "js-8",
        questionText: "What is the return value of `Array.prototype.reduce` when no initial value is supplied for an array with one element?",
        codeSnippet: `const res = [42].reduce((acc, curr) => acc + curr);
console.log(res);`,
        options: [
          "84",
          "42",
          "TypeError: Reduce of empty array with no initial value",
          "0"
        ],
        correctAnswer: "B",
        explanation: "If the array has only one element and no initial value is provided, `reduce` immediately returns that single element without calling the callback.",
        points: 1
      },
      {
        id: "js-9",
        questionText: "What is the result of applying `bind` multiple times to a function?",
        codeSnippet: `function greet() { return this.name; }
const bound1 = greet.bind({ name: 'Alice' });
const bound2 = bound1.bind({ name: 'Bob' });

console.log(bound2());`,
        options: [
          "'Bob'",
          "'Alice'",
          "undefined",
          "TypeError: Function already bound"
        ],
        correctAnswer: "B",
        explanation: "Once a function is bound via `bind()`, its `this` context is permanently locked to the first target and cannot be overridden by subsequent `bind` calls.",
        points: 1
      },
      {
        id: "js-10",
        questionText: "What is the value of `2 + '2' - 1` in JavaScript?",
        codeSnippet: `console.log(2 + '2' - 1);`,
        options: [
          "21",
          "3",
          "NaN",
          "'21'"
        ],
        correctAnswer: "A",
        explanation: "`2 + '2'` performs string concatenation producing `'22'`. The subtraction `'22' - 1` coerces `'22'` into the number 22 and computes 22 - 1 = 21 (number).",
        points: 1
      },
      {
        id: "js-11",
        questionText: "What does the `WeakMap` data structure in JavaScript hold as keys?",
        codeSnippet: null,
        options: [
          "Only primitive strings and symbols",
          "Only objects (and non-registered symbols in ES2023+)",
          "Any primitive or object value",
          "Only numbers and bigints"
        ],
        correctAnswer: "B",
        explanation: "WeakMap keys must be objects (or registered symbols in latest specs) allowing garbage collection if no other references exist.",
        points: 1
      },
      {
        id: "js-12",
        questionText: "What does `Object.freeze()` do compared to `Object.seal()`?",
        codeSnippet: null,
        options: [
          "freeze allows modifying existing properties; seal does not",
          "freeze makes properties read-only and prevents additions/deletions; seal allows modifying existing properties",
          "seal deep freezes nested objects; freeze is shallow",
          "Both methods are completely identical aliases"
        ],
        correctAnswer: "B",
        explanation: "`Object.seal()` prevents adding/deleting properties but allows modifying existing writable properties. `Object.freeze()` also prevents modifying existing properties (makes them read-only).",
        points: 1
      }
    ]
  },
  {
    id: "react-mastery",
    title: "React.js & Modern Hooks",
    description: "Master component lifecycle, hooks (useState, useEffect, useMemo, useCallback, useRef), reconciliation, and state management.",
    category: "React",
    difficulty: "Intermediate",
    timeLimit: 15,
    passingScore: 75,
    icon: "Atom",
    questions: [
      {
        id: "react-1",
        questionText: "What is printed in the console when clicking the button once?",
        codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={handleClick}>Click</button>;
}`,
        options: [
          "0 (state updates are queued/batched, count is 3 in next render)",
          "3 (state updates immediately mutate count)",
          "1 (count is incremented once immediately)",
          "undefined"
        ],
        correctAnswer: "A",
        explanation: "State updates in React are batched and asynchronous relative to the event handler. `count` in the current closure remains 0 during `handleClick`. Since all updates refer to `count + 1` (0 + 1), next render count will be 1 unless updater functions `prev => prev + 1` are used.",
        points: 1
      },
      {
        id: "react-2",
        questionText: "How does `useCallback(fn, deps)` differ from `useMemo(fn, deps)`?",
        codeSnippet: null,
        options: [
          "`useCallback` memoizes the function instance; `useMemo` memoizes the computed return value of calling the function",
          "`useCallback` is for asynchronous code; `useMemo` is for synchronous calculations",
          "`useMemo` runs on every render; `useCallback` runs only on mount",
          "There is no difference; they are interchangeable"
        ],
        correctAnswer: "A",
        explanation: "`useCallback(fn, deps)` returns a memoized version of the callback function itself, whereas `useMemo(() => compute(), deps)` returns the memoized result of invoking the callback.",
        points: 1
      },
      {
        id: "react-3",
        questionText: "What will happen with this `useEffect` cleanup function?",
        codeSnippet: `useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);
  return () => {
    clearInterval(timer);
    console.log('cleaned');
  };
}, [count]);`,
        options: [
          "Cleanup only runs when the component unmounts",
          "Cleanup runs before every re-run of the effect and on unmount",
          "Cleanup runs immediately after the component mounts",
          "Cleanup runs when the browser window closes"
        ],
        correctAnswer: "B",
        explanation: "When dependencies change, React executes the cleanup function from the previous render before executing the new effect, and also upon unmounting.",
        points: 1
      },
      {
        id: "react-4",
        questionText: "Why shouldn't you use array indices as `key` props when list items can be reordered, inserted, or deleted?",
        codeSnippet: null,
        options: [
          "It throws a compile-time syntax error in JSX",
          "It impairs component state retention and leads to UI bugs and inefficient DOM reconciliation",
          "Keys are required to be UUID strings only",
          "Array index keys disable all CSS transitions"
        ],
        correctAnswer: "B",
        explanation: "Using index as a key confuses React's diffing algorithm when elements are reordered, deleted, or inserted at the top, potentially causing component state (like uncontrolled inputs) to stick to the wrong items.",
        points: 1
      },
      {
        id: "react-5",
        questionText: "What happens when updating a `useRef`'s `.current` value?",
        codeSnippet: `const countRef = useRef(0);
function increment() {
  countRef.current += 1;
}`,
        options: [
          "It immediately triggers a component re-render",
          "It mutates the value without causing a component re-render",
          "It triggers re-render only if used in JSX",
          "It throws a runtime error in Strict Mode"
        ],
        correctAnswer: "B",
        explanation: "Mutating `.current` on a `useRef` object is a synchronous mutation that persists across renders without triggering a re-render.",
        points: 1
      },
      {
        id: "react-6",
        questionText: "What is the purpose of React 18's `useTransition` hook?",
        codeSnippet: `const [isPending, startTransition] = useTransition();`,
        options: [
          "To animate CSS transitions between routes",
          "To mark non-urgent state updates as transitions that can be interrupted by urgent updates (like typing)",
          "To migrate components from class components to functional components",
          "To handle HTTP fetch transitions and suspense boundaries"
        ],
        correctAnswer: "B",
        explanation: "`useTransition` lets you mark state updates as non-blocking transitions so the UI stays responsive to urgent interactions like typing or clicks.",
        points: 1
      },
      {
        id: "react-7",
        questionText: "In React Strict Mode during development, how many times do component bodies and useEffects run on mount?",
        codeSnippet: null,
        options: [
          "1 time",
          "2 times (to help find side-effect and cleanup bugs)",
          "3 times",
          "Depends on number of CPU cores"
        ],
        correctAnswer: "B",
        explanation: "React Strict Mode deliberately mounts components twice in development to uncover uncleaned effects and accidental impure render side-effects.",
        points: 1
      },
      {
        id: "react-8",
        questionText: "What does `React.memo(Component, arePropsEqual)` do?",
        codeSnippet: null,
        options: [
          "Stores the component HTML in browser localStorage",
          "Higher Order Component that skips re-rendering if props have not changed (shallow comparison by default)",
          "Forces the component to re-render whenever parent renders",
          "Generates static HTML for Server Side Rendering"
        ],
        correctAnswer: "B",
        explanation: "`React.memo` is a performance optimization tool that memoizes the rendered output and skips re-rendering if props are unchanged.",
        points: 1
      },
      {
        id: "react-9",
        questionText: "What is the correct way to update nested object state with `useState`?",
        codeSnippet: `const [user, setUser] = useState({ name: 'Sam', meta: { age: 25 } });`,
        options: [
          "user.meta.age = 26; setUser(user);",
          "setUser({ ...user, meta: { ...user.meta, age: 26 } });",
          "setUser(user.meta.age = 26);",
          "setUser(Object.freeze(user));"
        ],
        correctAnswer: "B",
        explanation: "React state must be treated as immutable. You must create shallow copies of both the outer object and any nested objects being modified.",
        points: 1
      },
      {
        id: "react-10",
        questionText: "What hook should be used when reading layout from the DOM synchronously before browser paint?",
        codeSnippet: null,
        options: [
          "useEffect",
          "useLayoutEffect",
          "useInsertionEffect",
          "useImperativeHandle"
        ],
        correctAnswer: "B",
        explanation: "`useLayoutEffect` fires synchronously after all DOM mutations and before the browser paints the screen, making it ideal for measuring DOM layout.",
        points: 1
      }
    ]
  },
  {
    id: "python-programming",
    title: "Python Programming & Idioms",
    description: "Test your mastery of Python data types, list comprehensions, decorators, generators, GIL, and OOP mechanics.",
    category: "Python",
    difficulty: "Intermediate",
    timeLimit: 15,
    passingScore: 75,
    icon: "FileCode",
    questions: [
      {
        id: "py-1",
        questionText: "What will the following Python code output?",
        codeSnippet: `def append_to(num, target=[]):
    target.append(num)
    return target

print(append_to(1))
print(append_to(2))`,
        options: [
          "[1] and [2]",
          "[1] and [1, 2]",
          "[1, 2] and [1, 2]",
          "Error: mutable default argument"
        ],
        correctAnswer: "B",
        explanation: "Default parameter values are evaluated once when the function definition is executed, so the same mutable list `target` is reused across successive calls.",
        points: 1
      },
      {
        id: "py-2",
        questionText: "What is the output of the following list comprehension slice in Python?",
        codeSnippet: `nums = [1, 2, 3, 4, 5]
print(nums[::-2])`,
        options: [
          "[5, 3, 1]",
          "[1, 3, 5]",
          "[5, 4, 3]",
          "[4, 2]"
        ],
        correctAnswer: "A",
        explanation: "The slice `[::-2]` steps backwards from the end of the list with a step size of 2, selecting elements at indices 4, 2, and 0 (`[5, 3, 1]`).",
        points: 1
      },
      {
        id: "py-3",
        questionText: "What does the `yield` keyword do inside a Python function?",
        codeSnippet: `def count_up(n):
    i = 0
    while i < n:
        yield i
        i += 1`,
        options: [
          "Terminates the program execution immediately",
          "Turns the function into a generator that produces values lazily one at a time",
          "Spawns a new OS background thread",
          "Converts the return value into a JSON string"
        ],
        correctAnswer: "B",
        explanation: "A function containing `yield` becomes a generator function. Calling it returns a generator iterator that produces values on demand when `next()` is called.",
        points: 1
      },
      {
        id: "py-4",
        questionText: "What is the difference between `is` and `==` in Python?",
        codeSnippet: `a = [1, 2, 3]
b = [1, 2, 3]
print(a == b, a is b)`,
        options: [
          "True, True",
          "True, False",
          "False, True",
          "False, False"
        ],
        correctAnswer: "B",
        explanation: "`==` checks for equality of value (are the contents identical?), while `is` checks for object identity in memory (`id(a) == id(b)`). Since `a` and `b` are separate list allocations, `a is b` is False.",
        points: 1
      },
      {
        id: "py-5",
        questionText: "What will the following code output regarding dictionary keys?",
        codeSnippet: `d = {}
d[1] = 'one'
d[1.0] = 'one point zero'
d[True] = 'true'

print(len(d), d[1])`,
        options: [
          "3, 'one'",
          "1, 'true'",
          "2, 'one point zero'",
          "TypeError: unhashable type"
        ],
        correctAnswer: "B",
        explanation: "In Python, `1 == 1.0 == True` and `hash(1) == hash(1.0) == hash(True)`. Since their hash and value are equal, they map to the exact same dictionary key, overwriting the value to 'true'.",
        points: 1
      },
      {
        id: "py-6",
        questionText: "What does the `@classmethod` decorator do when applied to a method?",
        codeSnippet: `class Demo:
    @classmethod
    def create(cls):
        return cls()`,
        options: [
          "Transforms the method to accept the class object (`cls`) as its first argument rather than an instance (`self`)",
          "Makes the method private and inaccessible from outside",
          "Runs the method automatically during class definition",
          "Forces the method to be static without any arguments"
        ],
        correctAnswer: "A",
        explanation: "`@classmethod` passes the class object as the first parameter `cls`, allowing methods to access class state or serve as alternative constructors.",
        points: 1
      },
      {
        id: "py-7",
        questionText: "What is the Global Interpreter Lock (GIL) in CPython?",
        codeSnippet: null,
        options: [
          "A security lock preventing unauthorized network access",
          "A mutex that prevents multiple native threads from executing Python bytecodes simultaneously in CPython",
          "A mechanism that prevents modifying global variables",
          "A compiler optimization for matrix multiplication"
        ],
        correctAnswer: "B",
        explanation: "The GIL is a mutex used by CPython to ensure thread-safety with memory management (reference counts), meaning only one thread can execute Python bytecode at a time.",
        points: 1
      },
      {
        id: "py-8",
        questionText: "What is the output of the following `*args` and `**kwargs` unpacking?",
        codeSnippet: `def func(a, b, c):
    return a + b * c

args = [2, 3]
kwargs = {'c': 4}
print(func(*args, **kwargs))`,
        options: [
          "14",
          "20",
          "24",
          "TypeError"
        ],
        correctAnswer: "A",
        explanation: "`*args` passes `2` and `3` as `a` and `b`. `**kwargs` passes `c=4`. The function evaluates `2 + (3 * 4) = 14`.",
        points: 1
      },
      {
        id: "py-9",
        questionText: "What does `__slots__` do when defined in a Python class?",
        codeSnippet: `class Person:
    __slots__ = ('name', 'age')`,
        options: [
          "Restricts valid attribute names, suppresses `__dict__` creation, and reduces memory footprint",
          "Creates database foreign key slots automatically",
          "Makes all class instances thread-safe",
          "Allows arbitrary key-value attachments at runtime"
        ],
        correctAnswer: "A",
        explanation: "`__slots__` tells Python not to use a dynamic `__dict__` dictionary for instances, drastically reducing memory overhead and locking the attribute names.",
        points: 1
      },
      {
        id: "py-10",
        questionText: "What does the `finally` block in a `try...except...finally` construct guarantee?",
        codeSnippet: null,
        options: [
          "It executes only if an exception occurred",
          "It always executes regardless of whether an exception occurred or if a `return` was issued in `try`",
          "It cancels any raised exception silently",
          "It runs before the `try` block begins"
        ],
        correctAnswer: "B",
        explanation: "The `finally` block is guaranteed to execute after `try` and `except` blocks complete, even if a `return`, `break`, or unhandled exception occurs.",
        points: 1
      }
    ]
  },
  {
    id: "dsa-algorithms",
    title: "Data Structures & Algorithms",
    description: "Test core computer science topics: Stacks, Queues, Trees, Graphs, Sorting, Dynamic Programming, and Big-O Complexity.",
    category: "Algorithms",
    difficulty: "Advanced",
    timeLimit: 20,
    passingScore: 75,
    icon: "Network",
    questions: [
      {
        id: "dsa-1",
        questionText: "Which data structure follows the Last-In, First-Out (LIFO) principle?",
        codeSnippet: null,
        options: [
          "Queue",
          "Stack",
          "Binary Search Tree",
          "Min Heap"
        ],
        correctAnswer: "B",
        explanation: "A Stack follows the Last-In, First-Out (LIFO) principle, where the most recently added item is the first one to be removed (push and pop).",
        points: 1
      },
      {
        id: "dsa-2",
        questionText: "What is the worst-case time complexity of QuickSort when bad pivot selection is used (e.g. sorted array with last element pivot)?",
        codeSnippet: null,
        options: [
          "O(n log n)",
          "O(n^2)",
          "O(log n)",
          "O(n)"
        ],
        correctAnswer: "B",
        explanation: "In the worst case (e.g., partitioning an already sorted array with extreme pivot choices), QuickSort makes n recursive partitions of size n-1, leading to O(n^2) time complexity.",
        points: 1
      },
      {
        id: "dsa-3",
        questionText: "What is the time complexity of searching for an element in a balanced Binary Search Tree (such as AVL or Red-Black tree)?",
        codeSnippet: null,
        options: [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n log n)"
        ],
        correctAnswer: "B",
        explanation: "Because a balanced BST maintains a height proportional to log₂(n), searching eliminates half the remaining subtree at each step, yielding O(log n) complexity.",
        points: 1
      },
      {
        id: "dsa-4",
        questionText: "Which algorithm is used to find the shortest path from a single source node in a graph with non-negative edge weights?",
        codeSnippet: null,
        options: [
          "Kruskal's Algorithm",
          "Dijkstra's Algorithm",
          "Floyd-Warshall Algorithm",
          "Depth-First Search (DFS)"
        ],
        correctAnswer: "B",
        explanation: "Dijkstra's Algorithm finds the shortest paths from a single source vertex to all other vertices in a weighted graph with non-negative edge weights using a priority queue.",
        points: 1
      },
      {
        id: "dsa-5",
        questionText: "What algorithm paradigm is used in Merge Sort?",
        codeSnippet: null,
        options: [
          "Greedy Approach",
          "Divide and Conquer",
          "Dynamic Programming",
          "Backtracking"
        ],
        correctAnswer: "B",
        explanation: "Merge Sort recursively divides the array into two halves (Divide), sorts them recursively, and merges the sorted halves back together (Conquer).",
        points: 1
      },
      {
        id: "dsa-6",
        questionText: "What is the time complexity to insert an element into the middle of an array of length N vs at a specific node in a Doubly Linked List (given pointer to node)?",
        codeSnippet: null,
        options: [
          "Array: O(1), Linked List: O(n)",
          "Array: O(n), Linked List: O(1)",
          "Array: O(log n), Linked List: O(1)",
          "Both are O(1)"
        ],
        correctAnswer: "B",
        explanation: "Inserting into an array requires shifting elements to open a slot (O(n)). Inserting into a linked list when having the node pointer only requires updating a few pointers (O(1)).",
        points: 1
      },
      {
        id: "dsa-7",
        questionText: "Which data structure is typically used to implement Breadth-First Search (BFS) on a graph?",
        codeSnippet: null,
        options: [
          "Stack",
          "Queue",
          "Priority Queue",
          "Hash Map"
        ],
        correctAnswer: "B",
        explanation: "BFS explores neighbors level-by-level using a FIFO Queue to preserve visiting order.",
        points: 1
      },
      {
        id: "dsa-8",
        questionText: "What is the space complexity of calculating the Nth Fibonacci number using naive recursion without memoization?",
        codeSnippet: `def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)`,
        options: [
          "O(1)",
          "O(n) due to maximum call stack depth",
          "O(2^n)",
          "O(n log n)"
        ],
        correctAnswer: "B",
        explanation: "While the time complexity is O(2^n), the maximum depth of the call stack recursion tree at any given moment is proportional to O(n), so space complexity is O(n).",
        points: 1
      },
      {
        id: "dsa-9",
        questionText: "What is the best average-case lookup time in a Hash Table with good distribution?",
        codeSnippet: null,
        options: [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n^2)"
        ],
        correctAnswer: "A",
        explanation: "With a uniform hash function and low load factor, hash table lookups occur in O(1) constant average time.",
        points: 1
      },
      {
        id: "dsa-10",
        questionText: "Which sorting algorithm is guaranteed to be stable and have O(n log n) worst-case time complexity?",
        codeSnippet: null,
        options: [
          "Quick Sort",
          "Heap Sort",
          "Merge Sort",
          "Selection Sort"
        ],
        correctAnswer: "C",
        explanation: "Merge Sort maintains the relative order of identical elements (stable) and consistently runs in O(n log n) time across best, average, and worst cases.",
        points: 1
      }
    ]
  },
  {
    id: "web-dev-css",
    title: "Modern Web Dev & CSS Architecture",
    description: "Test your knowledge on HTML5 semantics, CSS Flexbox, CSS Grid, Box Model, specificity, and responsive web design.",
    category: "Web Development",
    difficulty: "Beginner",
    timeLimit: 12,
    passingScore: 75,
    icon: "Layout",
    questions: [
      {
        id: "web-1",
        questionText: "What does `box-sizing: border-box;` do in CSS?",
        codeSnippet: `* {
  box-sizing: border-box;
}`,
        options: [
          "Adds an automatic 1px solid border to all elements",
          "Includes padding and border within the element's specified width and height",
          "Excludes margins and padding from layout calculations",
          "Forces elements to behave like table cells"
        ],
        correctAnswer: "B",
        explanation: "`border-box` ensures the element's total width and height include padding and borders, making responsive layouts much easier to predict.",
        points: 1
      },
      {
        id: "web-2",
        questionText: "In CSS Flexbox, what property aligns items along the cross axis?",
        codeSnippet: `.container {
  display: flex;
  flex-direction: row;
  /* ? */
}`,
        options: [
          "justify-content",
          "align-items",
          "flex-wrap",
          "align-content"
        ],
        correctAnswer: "B",
        explanation: "`justify-content` aligns items along the main axis (row in this case), while `align-items` aligns items along the cross axis (perpendicular).",
        points: 1
      },
      {
        id: "web-3",
        questionText: "Which selector has the highest CSS specificity?",
        codeSnippet: null,
        options: [
          "`#nav .item a` (ID + Class + Element)",
          "`.header .menu .item a` (3 Classes + Element)",
          "`div#nav > ul > li > a` (ID + 4 Elements)",
          "`body header div a` (4 Elements)"
        ],
        correctAnswer: "A",
        explanation: "Specificity is calculated as (ID, Class/Attribute/Pseudo-class, Element). `#nav .item a` is (1, 1, 1), whereas `div#nav > ul > li > a` is (1, 0, 4). (1, 1, 1) > (1, 0, 4).",
        points: 1
      },
      {
        id: "web-4",
        questionText: "What does the `rem` unit represent in CSS?",
        codeSnippet: `p { font-size: 1.5rem; }`,
        options: [
          "Relative to the font size of the immediate parent element",
          "Relative to the font size of the root element (<html>)",
          "Relative to 1% of the viewport width",
          "Relative to the browser window resolution (DPI)"
        ],
        correctAnswer: "B",
        explanation: "`rem` stands for 'Root EM' and is proportional to the font size of the root element `<html>` (typically 16px by default). `em` is relative to parent font size.",
        points: 1
      },
      {
        id: "web-5",
        questionText: "Which HTML5 element is semantically most appropriate for standalone self-contained syndicatable content (e.g. blog post, forum reply)?",
        codeSnippet: null,
        options: [
          "`<section>`",
          "`<article>`",
          "`<aside>`",
          "`<div>`"
        ],
        correctAnswer: "B",
        explanation: "`<article>` represents a self-contained composition in a document, page, or site, which is independently distributable or reusable.",
        points: 1
      },
      {
        id: "web-6",
        questionText: "What is the effect of setting `display: none` vs `visibility: hidden`?",
        codeSnippet: null,
        options: [
          "`display: none` removes the element from the document layout flow; `visibility: hidden` hides it but preserves its physical layout space",
          "`visibility: hidden` removes it from DOM; `display: none` hides it visually",
          "Both remove the element completely from layout space",
          "There is no functional difference"
        ],
        correctAnswer: "A",
        explanation: "`display: none` removes the element from rendering flow so it takes up 0 space. `visibility: hidden` renders the invisible element while still occupying its bounding box in the page layout.",
        points: 1
      },
      {
        id: "web-7",
        questionText: "What CSS Grid feature creates a responsive grid that automatically fits items into columns without media queries?",
        codeSnippet: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}`,
        options: [
          "`repeat(auto-fit, minmax(250px, 1fr))`",
          "`grid-auto-flow: dense`",
          "`grid-template-columns: flex`",
          "`align-content: space-around`"
        ],
        correctAnswer: "A",
        explanation: "Combining `repeat(auto-fit, minmax(min, 1fr))` dynamically packs as many columns as fit into the container width and expands them equally.",
        points: 1
      },
      {
        id: "web-8",
        questionText: "What is the purpose of the HTML `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` tag?",
        codeSnippet: null,
        options: [
          "To enable dark mode rendering",
          "To control the viewport's dimensions and scaling on mobile devices for proper responsive rendering",
          "To prevent users from zooming the webpage",
          "To load vector graphics faster"
        ],
        correctAnswer: "B",
        explanation: "The viewport meta tag instructs mobile browsers to match screen width in device-independent pixels and set the initial zoom level to 1.0.",
        points: 1
      }
    ]
  },
  {
    id: "sql-databases",
    title: "SQL & Relational Databases",
    description: "Test queries, joins, indexes, ACID properties, grouping, aggregate functions, and relational schema normalization.",
    category: "Databases",
    difficulty: "Intermediate",
    timeLimit: 15,
    passingScore: 75,
    icon: "Database",
    questions: [
      {
        id: "sql-1",
        questionText: "What type of JOIN returns all records from the left table and matched records from the right table (with NULLs for unmatched)?",
        codeSnippet: `SELECT u.name, o.id 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;`,
        options: [
          "INNER JOIN",
          "LEFT OUTER JOIN",
          "CROSS JOIN",
          "FULL OUTER JOIN"
        ],
        correctAnswer: "B",
        explanation: "A LEFT OUTER JOIN returns every row from the left table (`users`), and all matching rows from the right table (`orders`). If no match exists, NULL is filled.",
        points: 1
      },
      {
        id: "sql-2",
        questionText: "What is the difference between `WHERE` and `HAVING` clauses in SQL?",
        codeSnippet: `SELECT department_id, COUNT(*) 
FROM employees 
WHERE salary > 50000 
GROUP BY department_id 
HAVING COUNT(*) > 5;`,
        options: [
          "`WHERE` filters individual rows before grouping; `HAVING` filters aggregate groups after `GROUP BY`",
          "`HAVING` filters rows before grouping; `WHERE` filters groups",
          "`WHERE` can only be used with primary keys",
          "They are synonymous and can be used interchangeably"
        ],
        correctAnswer: "A",
        explanation: "`WHERE` filters input rows before aggregation occurs, while `HAVING` filters summary groups created by `GROUP BY` using aggregate criteria.",
        points: 1
      },
      {
        id: "sql-3",
        questionText: "What does ACID stand for in database transactions?",
        codeSnippet: null,
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Concurrency, Integrity, Distribution",
          "Authentication, Cryptography, Identity, Data",
          "Access, Consistency, Indexing, Deletion"
        ],
        correctAnswer: "A",
        explanation: "ACID stands for Atomicity (all-or-nothing), Consistency (valid state transitions), Isolation (concurrent safety), and Durability (committed changes persist).",
        points: 1
      },
      {
        id: "sql-4",
        questionText: "What happens during a SQL injection attack?",
        codeSnippet: `query = "SELECT * FROM users WHERE user = '" + input_name + "';";`,
        options: [
          "The database memory is depleted by huge transactions",
          "Malicious SQL code supplied via unsanitized user inputs is executed by the database engine",
          "Database connection ports are flooded with TCP packets",
          "Indices are corrupted and deleted"
        ],
        correctAnswer: "B",
        explanation: "SQL Injection occurs when untrusted input is directly concatenated into SQL statements, allowing attackers to inject arbitrary queries. It is prevented by parameterized queries.",
        points: 1
      },
      {
        id: "sql-5",
        questionText: "Which SQL constraint ensures that all values in a column are distinct and cannot be NULL?",
        codeSnippet: null,
        options: [
          "UNIQUE",
          "PRIMARY KEY",
          "FOREIGN KEY",
          "CHECK"
        ],
        correctAnswer: "B",
        explanation: "A PRIMARY KEY constraint uniquely identifies each record and implicitly enforces both UNIQUE and NOT NULL constraints.",
        points: 1
      },
      {
        id: "sql-6",
        questionText: "What index structure is most commonly used in relational databases like PostgreSQL and MySQL InnoDB for general range queries?",
        codeSnippet: null,
        options: [
          "B-Tree / B+Tree",
          "Hash Map",
          "Bloom Filter",
          "Linked List"
        ],
        correctAnswer: "A",
        explanation: "B+Trees keep sorted data balanced and allow efficient logarithmic search, sequential access, and range queries (O(log N)).",
        points: 1
      },
      {
        id: "sql-7",
        questionText: "What is the result of the following SQL query with `COUNT(column)` on a column with NULLs?",
        codeSnippet: `-- Table: test (val: 1, 2, NULL, 4)
SELECT COUNT(*), COUNT(val) FROM test;`,
        options: [
          "4, 4",
          "4, 3",
          "3, 3",
          "4, NULL"
        ],
        correctAnswer: "B",
        explanation: "`COUNT(*)` counts all rows (4), whereas `COUNT(column_name)` counts only rows where `column_name` is NOT NULL (3).",
        points: 1
      },
      {
        id: "sql-8",
        questionText: "What does the Third Normal Form (3NF) require for relational database tables?",
        codeSnippet: null,
        options: [
          "The table is in 2NF and contains no transitive functional dependencies (non-key columns depend ONLY on the primary key)",
          "The table must contain at least 3 foreign keys",
          "Every column must store XML or JSON blobs",
          "The table must be denormalized for maximum read throughput"
        ],
        correctAnswer: "A",
        explanation: "3NF requires a table to be in 2NF and every non-prime attribute to be non-transitively dependent on every candidate key ('depend on the key, the whole key, and nothing but the key').",
        points: 1
      }
    ]
  },
  {
    id: "oop-design-patterns",
    title: "OOP & Software Design Patterns",
    description: "SOLID principles, Encapsulation, Polymorphism, Singleton, Factory, Observer, and architectural design patterns.",
    category: "Architecture",
    difficulty: "Intermediate",
    timeLimit: 15,
    passingScore: 75,
    icon: "Boxes",
    questions: [
      {
        id: "oop-1",
        questionText: "What does the 'S' in SOLID principles represent?",
        codeSnippet: null,
        options: [
          "Single Responsibility Principle: A class should have only one reason to change",
          "State Management Principle",
          "Static Polymorphism Principle",
          "Singleton Design Pattern"
        ],
        correctAnswer: "A",
        explanation: "Single Responsibility Principle (SRP) states that each module, class, or function should be responsible for only a single part of the functionality.",
        points: 1
      },
      {
        id: "oop-2",
        questionText: "Which design pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified?",
        codeSnippet: null,
        options: [
          "Factory Pattern",
          "Observer Pattern",
          "Adapter Pattern",
          "Decorator Pattern"
        ],
        correctAnswer: "B",
        explanation: "The Observer pattern enables subject-subscriber communication where observers are automatically notified of state modifications.",
        points: 1
      },
      {
        id: "oop-3",
        questionText: "What is the Liskov Substitution Principle (LSP)?",
        codeSnippet: null,
        options: [
          "Subtypes must be substitutable for their base types without altering program correctness",
          "Classes must communicate only via interfaces",
          "Every method must return a new instance of an object",
          "Variables should never be reassigned"
        ],
        correctAnswer: "A",
        explanation: "LSP states that objects of a superclass should be replaceable with objects of its subclasses without breaking application behavior.",
        points: 1
      },
      {
        id: "oop-4",
        questionText: "What is the primary characteristic of the Singleton Pattern?",
        codeSnippet: null,
        options: [
          "Ensures a class has only one instance and provides a global access point to it",
          "Splits a single class into multiple microservices",
          "Provides a factory for creating related families of objects",
          "Caches function arguments in memory"
        ],
        correctAnswer: "A",
        explanation: "A Singleton restricts instantiation of a class to a single instance and controls access via a static method or instance holder.",
        points: 1
      },
      {
        id: "oop-5",
        questionText: "What is the difference between Composition and Inheritance in OOP?",
        codeSnippet: null,
        options: [
          "Inheritance represents an 'is-a' relationship; Composition represents a 'has-a' relationship",
          "Composition creates tightly coupled hierarchies; Inheritance allows dynamic runtime swaps",
          "Inheritance is only available in functional languages",
          "There is no architectural difference"
        ],
        correctAnswer: "A",
        explanation: "Inheritance creates an 'is-a' relationship (subclass extends superclass). Composition establishes a 'has-a' relationship (class contains instances of other classes), often favored for looser coupling ('favor composition over inheritance').",
        points: 1
      },
      {
        id: "oop-6",
        questionText: "Which design pattern attaches additional responsibilities to an object dynamically without subclassing?",
        codeSnippet: null,
        options: [
          "Decorator Pattern",
          "Strategy Pattern",
          "Facade Pattern",
          "Prototype Pattern"
        ],
        correctAnswer: "A",
        explanation: "The Decorator pattern wraps an object in a decorator class to add behavior dynamically while preserving the original object's interface.",
        points: 1
      },
      {
        id: "oop-7",
        questionText: "What does Dependency Inversion Principle (the 'D' in SOLID) state?",
        codeSnippet: null,
        options: [
          "High-level modules should not depend on low-level modules; both should depend on abstractions",
          "All dependencies must be declared in global variables",
          "Subclasses must invert parent class method logic",
          "Databases should drive UI business rules directly"
        ],
        correctAnswer: "A",
        explanation: "Dependency Inversion states that high-level modules should depend on interfaces/abstractions rather than concrete low-level implementations.",
        points: 1
      },
      {
        id: "oop-8",
        questionText: "Which design pattern provides a simplified interface to a complex subsystem or library?",
        codeSnippet: null,
        options: [
          "Facade Pattern",
          "Proxy Pattern",
          "Builder Pattern",
          "State Pattern"
        ],
        correctAnswer: "A",
        explanation: "The Facade pattern provides a higher-level, clean interface that makes a complex subsystem easier to use.",
        points: 1
      }
    ]
  },
  {
    id: "coding-logic-output",
    title: "Coding Logic & Output Prediction",
    description: "Sharpen your tracing skills with tricky edge cases, bitwise operations, coercion, recursion, and algorithm tracing.",
    category: "Coding Logic",
    difficulty: "Advanced",
    timeLimit: 15,
    passingScore: 75,
    icon: "Cpu",
    questions: [
      {
        id: "logic-1",
        questionText: "What is the output of the following bitwise manipulation code?",
        codeSnippet: `let a = 5; // 0101
let b = 3; // 0011

console.log(a ^ b);
console.log(a & b);
console.log(a << 1);`,
        options: [
          "6, 1, 10",
          "8, 0, 5",
          "6, 0, 10",
          "2, 1, 6"
        ],
        correctAnswer: "A",
        explanation: "`5 ^ 3` (XOR) is 0110 = 6. `5 & 3` (AND) is 0001 = 1. `5 << 1` (Left shift by 1) multiplies 5 by 2 = 10.",
        points: 1
      },
      {
        id: "logic-2",
        questionText: "What will the recursive function `mystery(3, 4)` return?",
        codeSnippet: `function mystery(a, b) {
  if (b === 0) return 0;
  if (b % 2 === 0) {
    return mystery(a + a, Math.floor(b / 2));
  }
  return a + mystery(a + a, Math.floor(b / 2));
}`,
        options: [
          "12 (computes a * b via Russian Peasant multiplication)",
          "81",
          "7",
          "Infinite Recursion Error"
        ],
        correctAnswer: "A",
        explanation: "This is the ancient Russian Peasant / binary multiplication algorithm computing `a * b` in O(log b) time. `3 * 4 = 12`.",
        points: 1
      },
      {
        id: "logic-3",
        questionText: "What is the output of the following array sorting in JavaScript?",
        codeSnippet: `const numbers = [10, 5, 40, 25, 1000, 1];
numbers.sort();
console.log(numbers);`,
        options: [
          "[1, 10, 1000, 25, 40, 5]",
          "[1, 5, 10, 25, 40, 1000]",
          "[1000, 40, 25, 10, 5, 1]",
          "TypeError: comparator required"
        ],
        correctAnswer: "A",
        explanation: "By default, JavaScript's `Array.prototype.sort()` converts elements to strings and compares their UTF-16 code units lexicographically ('1', '10', '1000', '25', '40', '5').",
        points: 1
      },
      {
        id: "logic-4",
        questionText: "What does this snippet evaluate to?",
        codeSnippet: `console.log(0.1 + 0.2 === 0.3);
console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON);`,
        options: [
          "false, true",
          "true, true",
          "false, false",
          "true, false"
        ],
        correctAnswer: "A",
        explanation: "Due to IEEE 754 floating-point binary representation, `0.1 + 0.2` is `0.30000000000000004`, making strict equality false. Using `Number.EPSILON` for floating comparison evaluates to true.",
        points: 1
      },
      {
        id: "logic-5",
        questionText: "What is the output of the following JavaScript object destructuring and renaming?",
        codeSnippet: `const user = { name: 'Alex', age: 28 };
const { name: username, age, role = 'developer' } = user;

console.log(typeof name, username, role);`,
        options: [
          "'undefined', 'Alex', 'developer'",
          "'string', 'Alex', 'developer'",
          "'Alex', 'Alex', 'undefined'",
          "ReferenceError"
        ],
        correctAnswer: "A",
        explanation: "`name: username` extracts property `name` into a new local variable `username`. The variable `name` is not declared (so `typeof name` is 'undefined' or global name in window), `username` is 'Alex', and default `role` is 'developer'.",
        points: 1
      },
      {
        id: "logic-6",
        questionText: "What is the output of the following generator function in JavaScript?",
        codeSnippet: `function* gen() {
  const x = yield 10;
  yield x * 2;
}

const g = gen();
console.log(g.next().value);
console.log(g.next(5).value);`,
        options: [
          "10, 10",
          "10, 20",
          "undefined, 10",
          "10, NaN"
        ],
        correctAnswer: "A",
        explanation: "The first `g.next()` yields 10 and pauses at `yield 10`. The second `g.next(5)` resumes execution, passing 5 as the value of the yield expression `x = 5`, and then yields `5 * 2 = 10`.",
        points: 1
      },
      {
        id: "logic-7",
        questionText: "What will the following code log?",
        codeSnippet: `const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
        options: [
          "456",
          "123",
          "undefined",
          "TypeError"
        ],
        correctAnswer: "A",
        explanation: "When plain objects are used as keys in a regular JavaScript object, they are coerced to string `\"[object Object]\"`. Thus both `a[b]` and `a[c]` set `a[\"[object Object]\"]`, resulting in 456.",
        points: 1
      },
      {
        id: "logic-8",
        questionText: "What is the output of the following `parseInt` mapping?",
        codeSnippet: `console.log(['1', '7', '11'].map(parseInt));`,
        options: [
          "[1, NaN, 3]",
          "[1, 7, 11]",
          "[1, 7, NaN]",
          "[1, 1, 1]"
        ],
        correctAnswer: "A",
        explanation: "`map` passes `(element, index)` to the callback. `parseInt('1', 0)` -> 1. `parseInt('7', 1)` -> NaN (radix 1 invalid). `parseInt('11', 2)` -> 3 (binary 11 is 3).",
        points: 1
      }
    ]
  },
  {
    id: "typescript-types",
    title: "TypeScript & Type Safety",
    description: "Generics, Union & Intersection Types, Utility Types (Partial, Omit, Pick), Type Narrowing, and Mapped Types.",
    category: "TypeScript",
    difficulty: "Advanced",
    timeLimit: 15,
    passingScore: 75,
    icon: "FileCheck",
    questions: [
      {
        id: "ts-1",
        questionText: "What does the `keyof` operator return in TypeScript?",
        codeSnippet: `type Point = { x: number; y: number };
type PointKeys = keyof Point;`,
        options: [
          "Union type 'x' | 'y'",
          "Array ['x', 'y']",
          "Object { x: string, y: string }",
          "number | number"
        ],
        correctAnswer: "A",
        explanation: "`keyof Point` produces a string or numeric literal union of the keys of the given type: `'x' | 'y'`.",
        points: 1
      },
      {
        id: "ts-2",
        questionText: "What is the difference between `unknown` and `any` in TypeScript?",
        codeSnippet: null,
        options: [
          "`any` disables type-checking entirely; `unknown` is type-safe and requires type narrowing before performing operations",
          "`unknown` can only hold primitive strings; `any` holds objects",
          "`unknown` is evaluated only at runtime; `any` is compile-time only",
          "There is no difference"
        ],
        correctAnswer: "A",
        explanation: "`unknown` is the type-safe counterpart of `any`. Anything is assignable to `unknown`, but `unknown` cannot be used or accessed without explicit type checking or assertions.",
        points: 1
      },
      {
        id: "ts-3",
        questionText: "Which utility type constructs a type with all properties of `T` set to optional?",
        codeSnippet: null,
        options: [
          "Partial<T>",
          "Required<T>",
          "Readonly<T>",
          "Record<string, T>"
        ],
        correctAnswer: "A",
        explanation: "`Partial<T>` turns all properties of interface or type `T` into optional (`?`) properties.",
        points: 1
      },
      {
        id: "ts-4",
        questionText: "What does the `never` type represent in TypeScript?",
        codeSnippet: `function throwError(msg: string): never {
  throw new Error(msg);
}`,
        options: [
          "The type of values that never occur (e.g. function that always throws or infinite loop)",
          "A variable that has null or undefined value",
          "A type alias for boolean false",
          "An async promise that never resolves"
        ],
        correctAnswer: "A",
        explanation: "`never` represents values that can never happen, often used for exhaustive checks in switch statements and functions that never return.",
        points: 1
      },
      {
        id: "ts-5",
        questionText: "What does the `as const` assertion do in TypeScript?",
        codeSnippet: `const config = {
  endpoint: 'https://api.dev',
  retries: 3
} as const;`,
        options: [
          "Locks all properties into `readonly` and infers literal types ('https://api.dev' and 3 instead of string and number)",
          "Converts the object to JSON during compilation",
          "Exports the object as a constant WebAssembly module",
          "Prevents the file from being compiled in development mode"
        ],
        correctAnswer: "A",
        explanation: "`as const` applies `readonly` recursively and narrows primitive property types to their exact literal values.",
        points: 1
      },
      {
        id: "ts-6",
        questionText: "Which TypeScript utility type constructs a type by picking all properties from `T` and then removing `K`?",
        codeSnippet: null,
        options: [
          "Omit<T, K>",
          "Pick<T, K>",
          "Exclude<T, U>",
          "Extract<T, U>"
        ],
        correctAnswer: "A",
        explanation: "`Omit<T, K>` constructs a type with all properties of `T` except those specified in `K`. `Exclude` works on union members.",
        points: 1
      },
      {
        id: "ts-7",
        questionText: "What is a Discriminated Union in TypeScript?",
        codeSnippet: `type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };`,
        options: [
          "A union of object types having a common literal property ('kind') used for type narrowing",
          "A union between numbers and strings",
          "An enum with duplicate numeric values",
          "A tuple with unknown length"
        ],
        correctAnswer: "A",
        explanation: "A discriminated union uses a common literal property (tag/discriminant) so TypeScript can automatically narrow the union type inside control flow branches.",
        points: 1
      },
      {
        id: "ts-8",
        questionText: "How does TypeScript enforce type safety with custom Type Predicates?",
        codeSnippet: `function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}`,
        options: [
          "By using the return type `parameterName is TypeName` to narrow the variable type in subsequent conditional blocks",
          "By throwing a runtime TypeError if false",
          "By executing WebAssembly assertions",
          "By compiling the function to C++"
        ],
        correctAnswer: "A",
        explanation: "Custom type guard functions use parameter type predicates `pet is Fish`. When returning true, TypeScript narrows the type of `pet` to `Fish`.",
        points: 1
      }
    ]
  }
];
