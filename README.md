# 100 days of node

This repository is meant to be my personal space to follow the #100daysOfCode challenge, but focused exclusively on nodeJS. The purpose is not to make a "project", but to keep track about the learning process with notes and links.
I hope that by the end of the challenge I'll be able to recognize myself as an advanced JavaScript/NodeJS developer. I'll be able to make new projects without getting stuck on any advanced topics.

## Some important notices for future Geraldo

1. No need to blame yourself if you've lost 1 or 2 consecutive days because you were spending some time with your family. Remember: you are not a robot;

2. Don't use the first message as an excuse for procrastination;

3. This challenge will help you become not only a better programmer and a nodeJS expert, but also a better person and professional. This will keep your consistency and persistance skills at their maximum.

4. Try to focus on the fundamentals. That means you should probably let frameworks for later and focus on the language.

5. Try to explain what you're doing in the code using comments. I know, I know, having comments everywhere is not "clean", but this is just for training purposes. Describing out of your head will help you internalize things.

6. Always use English.

## Day 01 - Iterators and Generators

I want to start the first day by studying something that I've been running from for some time. This simple `*` on functions gave me so much confusion back in the past, but I think I'm mature enough in the language today that I shouldn't have any problem understanding this concept.

## Day 02 - JS Expert Week 05

Most part of my day I was developing that project focused on the course. I revisited a lot of stuff that I am not really in contact on my daily work and also learned new things.

- How to configure my own SSL certificate;

- How to properly make unit tests, mocking absolutely everything that doesn't belong to that layer of test;

- How to make integration tests directly from the HTTP layer;

- How NodeJS 18.0.0 allows you to import internal modules with the `node:` prefix, making those modules a lot more organized;

- Making pretty logs by using `pino` and `pino-pretty`

- Creating generators to serve the `Transform` layer of an ETL of file processing;

- NodeJS Streams;

- Creating APIs using the native `https` module;

- Pass along the `this` context with `.bind` and `.apply`;

- Create a socket instance with `socket.io`;

- Handle file uploads with `busboy`;

- Manually handle CORS;

- Using `pipelines` to handle streams;

- Create git submodules;

- Use the terminal to create pipelines;

- and more...

## Day 03 - Manual HTTP Router Handler

A while ago I made a test. This test involved handling a few http routes and methods manually, without using a framework like express.
I failed this test back then, because I never worked with this module directly. I made hundreds of REST APIs before, but all of them used express.

The project from today helped me understand better how this module work and how can I handle all this stuff internally.

## Day 04 - Terminal Socket Stream

Since I'm into learning iterators and generators, it is time to start doing something with streams.
Today I created a very (very) simple application which just creates a net.socket server in a terminal and receives messages (streams) from other terminals.
The server uses a pipeline to send data from the socket to process.stdout, while the client uses a pipeline to send data from process.stdin to socket.
From this I started understanding a little bit how to:

- create a socket connection using the native node:net module
- listen to a socket using the native node:net module
- pipe information from the socket to the terminal
- pipe information from the terminal to the socket
- pipe information from the socket to a file stream

I also understood that:

- I can't use the same pipeline to send data for two different writable streams
- which means that, after I send the chunk to a writable stream, I can't have other item coming after this stream on the pipeline

I'm also getting used to JS Doc, it is very simple and can help a lot when you're trying to learn and don't want to use TypeScript.

## Day 05 - Proxy Handler

I started studying the Proxy object and understanding its behavior. To fix that knowledge on my head, I implemented a simple mock database model which produces a log each time you get a data.
For example: as soon as I use `getData('users', 'john@email.com')`, I'll get a log like this:

```log
[GET:START]: Table: users - Id: john@email.com on 2022-04-29T12:46:24.593Z
[GET:FINISH]: Table: users - Id: john@email.com on 2022-04-29T12:46:24.769Z
```

The log is outputted to a file called `output.log`.

Some things I understood by doing this:

- From node >= v17.5, there is a new syntax for importing files that uses the `assert` keyword. With this keyword, I'm able to specify that I'm importing a JSON file, and the language will take care of making it readable.

- It is easy to spy (create  a proxy) a simple object, but spying a Map is a little more complex.

- With the Proxy object, I can create a handler for each Object prototype method that I want to intercept (`has`, `), including getting and setting a prop.

- How to use the appendFile function from `node:fs`

- I normally don't use the class syntax too much, but I'm getting used to it. Maybe I'll use it more in the future. Get rid of the "only functional paradigm" way of thinking.

## Day 06 - Proxy Handler native tests

The idea today was to study a little bit of other testing libraries. I'm very used to jest, so I want to avoid it and learn other common used libraries like `chai`, `mocha` and `sinon`.

- Starting to understand the differences between mocks, spies, stubs and fakes. In jest, everything is a mock or a spy, so the keywords stubs and fakes are new to me.

- Read a little bit of the documentation of `sinon` and `chai` to understand how to use them.

That's pretty much it for today. I'm going to continue looking at it tomorrow and implement more tests.

## Day 07 - Router Handler tests

- [Before start]: The first time I tried to build the project from the third day where I made the Manual Http Route Handler project, my approach was a little bit different. I tried to make a TDD-like approach using Jest, but since I'm using nodeJS v18 and ESModules (which I think were the problem), I got into a lot of problems and just gave up doing it that way. On day 04, my idea was also to make tests for the project of the previous day, but I also couldn't make it work, so I moved on. Since now I'm learning how to use other testing libraries like `chai`, `mocha` and `sinon`, I'm going to try to implement in that project and see if I can make it work this time.

Let's start with:

- ~~I wanted to stop copying and pasting the projects from other days into the new day project, so I tried something different. I remembered how yarn and npm do a symbolic link to the package.json file, which makes it easier to reference packages that you're developing locally. I did a quick search and found the `ln` command, which works like a charm on MacOS. It does basically the same thing, creating a symbolic link to a folder or a file. I simply did `ln -s ../03-manual-http-router-handler/ ./manual-http-router-handler-link` and now I can reference the project without having to do one more `../` and removing the necessity of the copy and paste.~~

- ~~The above solution didn't worked as I expected, because the OS symlinks are not recognized by nodejs. I modified the day 3 package and ran `npm link` on it. I am able to reference it on the day 7 project now. Fail, but at least I learned something!~~

- ~~Mocking ES Modules is not easy. It can involve rewriting the imports of each module inside a single object, use the class syntax or do DI. I don't want to modify more the project of another day, so I'm going to try to use a third party library called [rewire](npmjs.com/package/rewire) and see if it does it works.~~

- After hours of trying to stub an object, I gave up and turned the `routes` object into a `getRoutes` function, which I was able to create stubs and spies easily.  

- Also decided to copy the project from day 03 to avoid making changes on its respective folder since I had to modify some stuff

- I also had the move the `errorHandlers` object to a separate file, and also changed it to use a function syntax.

Today I learned that:

- I still think there is a way to mock a constant object, but I still have to figure out how. I know that the `rewire` library might be able to help me on this.

- Mocking ES Modules without babel or a helper library is a pain in the ass. I hope there is a way to do that, but for now I'm going to stick with @babel/register to make my life easier.

- Unless the exports are all declared inside a single object, the best way to create stubs is to have them in a separate file.

## Day 8 - NodeJS Terminal: REPL, Google ZX

Today I focused on understanding a little bit how the REPL (Read Eval Print Loop) from nodejs works. I've heard this term before, and also used it before, but didn't know it had this name. It is basically a way to interact with the nodejs runtime, and it's very useful to debug and test your code.

- I got the following commands:

  ```sh
    node inspect file.js // starts the REPL and inspects the file.js
    list(100) // list the first 100 lines of the inspected file
    setBreakpoint(5) OR sb(5) // set a breakpoint on line 5
    clearBreakpoint('file.js', 5) OR cb('file.js', 5) // remove the breakpoint on line 5 of file.js
    cont // continue execution until the next breakpoint
    .save debug.log // save all commands to the debug.log file
    exec {} // execute the code in the REPL
    repl // execute repl and removes the necessity of having to type the `exec` prefix
  ```

  - Inside the repl, I can:
    - Print variables
    - Execute expressions
    - Do everything the nodejs REPL does (actually, you open the REPL when you type `node`. It is almost the same thing from the browser console)

  - So, when a breakpoint is hit, I can visualize everything that is inside the context (variables, functions, etc) of the file.

- After that, I also installed Google ZX, which uses the `$` prefix to execute shell commands. For simple scrips, this avoid the necessity of having to use `child_process` for executing commands.

- I understood a little bit how to use groups in regex, which I found interesting. Probably gonna get deep on this in the next days.

Tomorrow I'll continue to work a little bit with nodeJS terminal.

## Day 9 - RegEx

Actually this could be day 8 and 9. It is a little bit hard to make one project at a workday, so I had to take a little bit more time on it.

Since those expressions are a little bit more complex, the readme on the project folder will be more descriptive than this comment.

## Day 10 - Training RegExp

One more day practicing RegEx. Actually, I've been doing it for more days than I'm showing here. I'm getting really good at it. I found some interesting stuff while making some challenges on HackerHank to practice:

- For the `Find a Word` exercise, I needed to create an expression that would help me to find how many times a word was repeated in multiple strings. For that, I needed to use template literals to dynamically insert a string inside the expression. The thing that made me stuck was that the word boundary `/b` operator was disappearing from the mounted expression, and since I was using the HackerHank IDE, I didn't notice that `\b` was a special character, just line `\n`. When I realized that, I came upon the `String.raw` tag function, which avoids the need of escaping the special characters.

- regExp `exec` method is stateful, which means that the next time you run the same regExp it will not return the same result from before. To avoid this behavior, you can reset the `lastIndex` property of the RegExp object to `0`. In the `phoneNumber.js` file I made a Proxy object that will reset the `lastIndex` property of the RegExp object every time it is called.

- Or you can just use `exp.test`.

- On the `String.prototype.replace` function, you can use `$n` to replace the nth match of the expression. For example, if you want to replace the first match of the expression, you can use `$1`. If you want to replace the second match, you can use `$2`. If you want to replace using the whole expression, you can use `$&`. Example: get all variables of a .env file with `/^\w+/gm` and replace them with `REACT_APP_$&`. (`replaceEnvForReactApp.js` file)

- You can access expression groups easily with named groups:

```js
const phoneExp = /(?:(?<country_code>\+\d{2})\s)?\(?(?<area_code>\d{2})\)?\s?(\d{5})[\s-]?(\d{4})/g

const result = phoneExp.exec('+5537991785049')
console.log(result?.groups?.country_code) // +55
console.log(result?.groups?.area_code) // 37
```

## Day 11 - Advanced Error Handling NodeJS

There are some precautions we need to take when handling some kind of errors on nodeJS. What happens when you throw inside a setTimeout? Will the try/catch block wrapping it be executed? What about a top-level await promise rejection?

- if a promise is rejected and not handled inside another context (like setTimeout), or if it is rejected in the top-level of the application (without being awaited), it will be thrown as an unhandledRejection.

- if a promise is rejected in a top-level await context, it will be throw as an uncaughtException.

- you can handle unhandledRejection and uncaughtException errors using the `process` object.

```js
process.on('unhandledRejection', (err, cb);
process.on('uncaughtException', (err, cb);
```

- You can use process events `SIGTERM` and `SIGINT` to configure graceful shutdowns (check [gracefulShutdown.js](./11-advanced-error-handling/gracefulShutdown.js)). Let's suppose you are running a mongodb instance in a http server. You want to gracefully shutdown the server when the current instance of the application needs to be closed because a new version is on air. To make this happen, you need to fulfill the following requirements:

```txt
- if a request is being made during the shutdown process, the server MUST deliver that response.

- new requests will be redirected to the new version of the application.

- requests that are made after the shutdown process to the closing server will be rejected.

- after all the requests are finished, the server will be closed.
```

## Day 12 - Advanced Error Handling NodeJS - Notification Pattern

A common way to handle errors in REST apps is to throw it as soon as it happens. Although this is common, it is not the best way to do it. If you have a lot of errors, you'll probably throw them one by one, and the client will need to handle them one by one.
A better approach is to use the notification pattern. This pattern makes sure you'll send all errors (here called "notifications") at once to the client. This is very similar from what `yup` does when you use the `abortEarly: false` option.

```js
this.notifications = [
  'hero.name needs to be a string',
  'hero.power needs to be a number',
  'hero.power needs to be greater than 0',
]
```

### Reads:

- <https://martinfowler.com/articles/replaceThrowWithNotification.html>
- <https://medium.com/tableless/n%C3%A3o-lance-exceptions-em-seu-dom%C3%ADnio-use-notifications-70b31f7148d3>
- <https://martinfowler.com/eaaDev/Notification.html>

## Day 12 - node:cluster

If a NodeJS application is not containerized and needs to scale, the `node:cluster` module might be a good fit.
It has been in NodeJS since version 0.10.x, and it is still maintained. It is a module that allows you to run multiple NodeJS processes in parallel using the concept of clusters, primary and worker nodes/processes (prev. master-slave).

- The primary node is the "father" of the cluster. It can manage:
  - The amount of workers that will be created;
  - What will happen when a worker dies;
  - Spawn new workers when necessary;
  - Automatically makes load balancing between the workers;

- A worker node:
  - Is an instance of the application;
  - Each worker run in a different process PID;
  - Killing a worker not necessarily kills the nodeJS process (unless you want to kill the entire cluster);

Today's project is to create a cluster of workers that will be running in parallel.

- Workers will be "crashing" randomly (`Math.random * 10 seconds`);
- the primary node will take care of spawning new instances of them as soon as it dies.
- The workers will contain an HTTP server that will kill itself as soon as it receives a request.
- The primary node should not restart a worker that exited without an error.
- The number of workers is equivalent of the number of CPU cores of the host machine.

Check [cluster.log](./13-cluster-server/cluster.log).
