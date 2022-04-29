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
