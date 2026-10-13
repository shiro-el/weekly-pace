# weekly-pace

A Claude Code mod that shows your weekly usage pace above the prompt:

```
⇈ Weekly 40% / 10%
```

`40%` is how much of the weekly limit you've used; `10%` is how much of the week has passed since the last reset.

The arrow compares the pace that would use exactly the rest of your limit by the reset (remaining limit ÷ remaining time) with your pace so far (used ÷ elapsed):

| Recommended ÷ current | Arrow |
|---|---|
| ≥ 2× | blue ⇈ |
| > 1.2× | blue ↑ |
| between 1/1.2× and 1.2× | gray → |
| > 0.5× | red ↓ |
| ≤ 0.5× | red ⇊ |

Blue means you can use more; red means slow down.

Requires a Claude subscription (Pro/Max). The band appears after the first response reports your rate limits.

## Install

In a Claude Code terminal session:

```
/plugin install weekly-pace --marketplace shiro-el/weekly-pace
```

Answer `y` to add the marketplace, then pick a scope (user scope loads it in every session, desktop app's Code tab included).

## Develop

```
claude --plugin-dir .
claude plugin validate .
claude plugin test .
```
