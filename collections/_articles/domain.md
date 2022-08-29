---
title: Domain vs Application services
author: Vladimir Khorikov
link: https://enterprisecraftsmanship.com/posts/domain-vs-application-services
draft: false
---

DDD article about differences between domain and application service objects
-   Domain services carry domain knowledge; application services don’t (ideally).
-   Domain services hold domain logic that doesn’t naturally fit entities and value objects.
-   Introduce domain services when you see that some logic cannot be attributed to an entity/value object because that would break their isolation.