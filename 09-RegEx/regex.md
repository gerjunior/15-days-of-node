\d{3}.\d{3}.\d{3}-\d{2}

```txt
096.883.806-52
096.283.806-52
096.383.806.21
```

```txt
junior, geraldo
mendes, saadia
nunes, guilherme
```

cmd + F, Regex

Expression: ^(\w+),\s(\w+)$
Replace: { "firstName": "$2", "lastName": "$1" }

```json
{ "firstName": geraldo, "lastName": junior }
{ "firstName": saadia, "lastName": mendes }
{ "firstName": guilherme, "lastName": nunes }
```

Explanation:

-> \d - selects a digit
-> \w - selects a word
-> \d{n} - selects n consecutive digits (\w{n} works the same)
-> \w+ - selects all consecutive words (\d+ ☝️)
-> \s - selects a space
-> (\w+) -> creates a group.
  -> There are three groups on `^(\w+),\s(\w+)$`
  -> $0 is the whole expression (e.g. `junior, geraldo`)
  -> $1 is the first group (matches the first word before the comma)
  -> $2 is the second group (second word)
  -> the space and the comma are outside the created groups after $0
-> ^ - asserts that the expression will start at the beginning of the line
-> $ - asserts that the expression will end right after the declared expression

Named groups -> `(?<lastName>\w+),\s(?<firstName>\w+)`

`find . -name '*.js' -not -path '*node_modules**'`
