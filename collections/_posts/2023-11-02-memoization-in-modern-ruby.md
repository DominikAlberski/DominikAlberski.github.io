---
layout: post
title: 'Memoization in Modern Ruby: How a Shape-Based Approach to Instance Variables
  Lookup Impacts Performance.'
description: Memoization is a classic technique in Ruby programming, greatly assisting
  in boosting performance....
date: '2023-11-02 11:32:39 +0000'
tags:
- ruby
- performance
canonical_url: https://dev.to/dominik_alberski/memoization-in-modern-ruby-using-a-shape-based-approach-to-instance-variables-lookup-2lok
render_with_liquid: false
---

Memoization is a classic technique in Ruby programming, greatly assisting in boosting performance. With Ruby's ongoing evolution, particularly towards a shape-based method in instance variable lookups, thoughtfully implementing memoization can be beneficial. Inspired by Jean Boussier's insights on RailsAtScale.com, this post highlights some suggested best practices.

#### Why Consider Memoization?

Memoization helps cache results of resource-heavy function calls, aiming to speed up subsequent executions. Ruby’s newer shape-based mechanism for instance variable lookups suggests organizing objects based on their instance variables. This approach influences performance and memory usage, but it's important to note that using memoization indiscriminately could lead to a range of object shapes, which might inadvertently affect performance. Understanding these subtleties can be helpful for developers looking to craft efficient and thoughtful Ruby code.

#### Suggested Best Practices

Aligning with Ruby's shape-based approach and optimizing memoization strategies, developers might consider the following approaches:

1. **Mindful Use of Memoized Variables**: It’s generally a good idea to keep memoized variables to a minimum. Ideally, aiming for one or two per class helps. If you find yourself needing more, initializing these variables to `nil` in the constructor could be a proposed better approach:
    
```ruby
class MyClass 
	def initialize     
		@expensive_value = nil   
	end    
	
	def expensive_value     
		@expensive_value ||= compute_expensive_value   
	end 
end
```

    
2. **Handling Falsy Values with Tokens**: When dealing with memoized values that might return falsy results, using a token could be a neat way to differentiate between an uninitialized state and a value that's legitimately falsy:
{: start="2"}
    
```ruby
class MyClass   
	NOT_SET = Module.new   
	private_constant :NOT_SET    
	def initialize     
		@expensive_value = NOT_SET   
	end    
	
	def expensive_value     
		return @expensive_value unless @expensive_value == NOT_SET     @expensive_value = compute_expensive_value   
		end 
	end
end
```
    

#### Wrapping Up

Adjusting to Ruby's shape-based approach for variable lookups, we might consider refining our memoization tactics to help maintain efficient performance and thoughtful memory usage. For those interested in exploring this topic further, Jean Boussier provides a deeper dive in his article at [RailsAtScale](https://railsatscale.com/2023-10-24-memoization-pattern-and-object-shapes/). It's a thought-provoking read for anyone interested in evolving their Ruby coding practices in harmony with the latest language developments.

---

_This summary reflects ideas from Jean Boussier's article published on October 24, 2023, on RailsAtScale.com. To broaden your understanding, the original article is well worth a read._
