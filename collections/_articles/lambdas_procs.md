---
title: Lambdas are better then procs
author: Keith Bennett
author-link: https://dev.to/keithrbennett
link: https://dev.to/keithrbennett/lambdas-are-better-than-procs-52a1
draft: false
---

Prefer lambdas over procs
-   a `Proc` instance can be either lambda or a proc
-   all `lambda`s are `Proc`s
-   all `proc`s are `Proc`s
-   code blocks behave like `proc`s
-   you can determine the kind of Proc by calling `lambda?` on it
lambda -> strict argument count
lambada -> do not return from method when return is called in it