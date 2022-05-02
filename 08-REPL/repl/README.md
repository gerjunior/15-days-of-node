# Read-Eval-Print-Loop (REPL)

```bash
node inspect index.mjs

> list(100) 
> setBreakpoint(13)
> cont // continue execution
// make a request and the breakpoint will be hit
> exec req // show req object
> exec res
> exec req.url
> exec new URLSearchParams(req.url)
> exec new URLSearchParams(req.url).get('discount')
> .save debug.log
> r
> cb('index.mjs', 13) // clear breakpoint
> cont
> list(100)
> sb(16)
> cont
> repl // no need to use exec after this

```
