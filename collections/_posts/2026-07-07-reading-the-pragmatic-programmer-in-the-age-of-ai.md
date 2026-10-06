---
layout: post
title: Reading The Pragmatic Programmer in the age of AI
description: I bought The Pragmatic Programmer a few years ago but never finished
  it. As part of my current effort...
date: '2026-07-07 13:51:39 +0000'
tags:
- programming
- ai
- tdd
- softwareengineering
canonical_url: https://dev.to/dominik_alberski/reading-the-pragmatic-programmer-in-the-age-of-ai-3jnf
cover_image: "/assets/images/posts/reading-the-pragmatic-programmer-in-the-age-of-ai/cover.webp"
render_with_liquid: false
---

I bought _The Pragmatic Programmer_ a few years ago but never finished it. As part of my current effort to sharpen my fundamentals, I decided to finally read it from cover to cover.

I expected it to feel slightly dated. The first edition was written in 1999. The second edition came out in 2019, just before generative AI reshaped how many of us work. Instead I found the opposite: most of the principles still hold. What changed isn't their validity — it's the level at which they apply.

The first thing that stopped me was one sentence in chapter 2. The authors note, almost in passing, that there are still no compilers capable of generating software from a concise description of requirements. Reading that struck a strange tone in my mind. We still don't have the compiler they were imagining, but we do have LLMs and AI agents that occupy a surprisingly similar role — turning a few paragraphs of natural language into working software. A later chapter reinforces the feeling: the authors argue that programming can't be reduced to a mechanical process, or CASE tools would have replaced programmers long ago. History spent twenty years appearing to prove them right. Then it stopped being so obvious.

That became the question I read the rest of the book with: if implementation is finally being automated, which of these ideas become _more_ important, and which become less?

## The Knowledge Portfolio, revisited

Take the **Knowledge Portfolio**. On the surface, AI seems to reduce the need to learn deeply. Why spend months mastering something an assistant can explain or generate in seconds?

My strongest evidence to the contrary came from a React migration. I'm primarily a backend developer with little frontend experience. With AI's help I produced a UI that matched the mockups and met every functional requirement. To me, the code looked fine. The senior frontend engineers reviewing it disagreed — it ignored several established patterns in the codebase, and I didn't have enough experience to recognize the problems myself.

Later, on smaller and more clearly defined tasks, I noticed something. AI followed project conventions much more reliably when I could extract and state those conventions explicitly. The better I understood the rules of the system, the more useful the AI became. The lesson wasn't that AI replaced expertise. It was that expertise determined whether I could recognize good output when I saw it.

So learning and gaining expertise is still essential. Otherwise how will you notice mistakes in AI thinking? For me, the valuable investment is in mental models — functional programming, distributed systems, architecture, security, AI systems themselves. The goal is no longer accumulating syntax knowledge across many languages but understanding how software behaves.

## Orthogonality, DRY, and the cost of unclear thinking

The idea that gained the most weight for me was **orthogonality**. Clear boundaries between modules and responsibilities have always been good practice; in the AI era they're closer to a prerequisite. AI increasingly writes the implementation while the engineer defines interfaces, constraints, and responsibilities — and the quality of those boundaries determines how effectively AI can contribute. Vague definitions produce tangled, duplicated, hard-to-verify output. Clear ones produce something you can actually review and trust.

This sharpens **DRY**, too. The principle was always about duplicated _knowledge_, not duplicated code — but AI scatters business logic across services and modules so reliably when left unsupervised that the distinction becomes impossible to ignore.

There's one idea I initially thought was new, then reconsidered. I'd written in my notes that AI makes poor thinking _more expensive_ — a vague prompt burns tokens, time, and iterations. True, but engineers have always paid for unclear thinking. The currency used to be debugging and rework; now it's tokens and review cycles. The cost isn't new. What's new is how fast and how visibly it arrives. AI acts less like a new source of risk and more like a mirror: it doesn't create bad habits, it reflects them back faster.

## The Blackboard pattern, reframed

Master your tools, invest in your environment — still valid. But increasingly the tool is operated by an _agent_, not typed directly by a developer. Which makes plain text more central, not less: it's the medium through which intent reaches both humans and machines, in prompts, configuration files, and instructions. The skill that used to be "master your tools" is becoming "design workflows that you and an AI can both operate in effectively."

That reframing shows up most clearly in the **Blackboard pattern** — one of the book's more academic-feeling ideas, where independent specialists post partial solutions to a shared space until a solution emerges. It suddenly resembles modern multi-agent systems, where specialized agents collaborate through a shared space rather than a shared conversation.

![Image description](/assets/images/posts/reading-the-pragmatic-programmer-in-the-age-of-ai/image-1.png)

The reframe I keep coming back to is that what agents need to share isn't conversational context, which gets expensive fast, but structured knowledge: goals, decisions, findings, tasks.

Shared knowledge rather than shared context.

The more I experiment with agentic systems, the more I believe preserving useful knowledge matters more than preserving every step of the conversation that produced it.

## Testing: don't let AI do the thinking part

One place that caught my interest was testing. The authors frame tests as valuable less for catching bugs than for forcing you to reason about your code before you write it — and that matches what TDD taught me: deciding how to test something is part of designing it.

Which is why I'm cautious about handing testing entirely to an AI. Ask an agent to "add test coverage" and it will — but if it does the thinking too, you skip the part that was actually useful. You never ask what the code should guarantee, where it might break, or what "correct" means here. The tests exist, but the design reasoning they usually prompt didn't happen. So in practice I let the AI write the tests while I stay responsible for what to test — writing assertions is mechanical; deciding what to verify is where the thinking is.

## The lizard brain, and where instinct comes from

That worry generalizes. The authors tell you to trust your "lizard brain" — the instinct you develop from years of writing, debugging, and refactoring code yourself. That instinct is _earned_, and it's earned specifically by doing the work. So what happens when AI does more and more of that work? Can you build the same intuition reviewing generated code that you'd build writing it yourself? Or will the next generation of developers grow a different instinct — one tuned to architecture, decomposition, and judging AI output rather than to implementation detail?

I genuinely enjoy working with AI. It automates the repetitive parts and lets me explore ideas faster than before. But every problem it solves for me is a problem I don't solve myself — and solving problems is how experience accumulates. There's a balance to strike between using AI as a productivity tool and protecting the learning that produces judgment in the first place.

That, in the end, is what rereading _The Pragmatic Programmer_ left me with. Software engineering is becoming less about writing code and more about making decisions — architecture, domain modeling, contracts, boundaries. You can't reason well about AI-generated code if you don't understand software engineering yourself. Knowledge hasn't become less important; it's shifted from producing code to evaluating and guiding it.

The book didn't change my mind about AI. It sharpened it. The implementation was never the hardest part of the job. If AI keeps automating the mechanics, the ability to think clearly about software may become the most valuable skill a developer can have — and I'm genuinely unsure how we'll keep teaching it once the machine is doing the reps.
