---
layout: post
title: 'Rails Integration Testing with Fixtures: A Practical Approach for Complex
  Data Sets'
description: Load about 10,000 related records from 13 models into Rails integration tests fast. Use fixtures from production data, not factory_bot.
date: '2024-05-07 07:47:48 +0000'
tags:
- rails
- testing
- fixtures
canonical_url: https://dev.to/dominik_alberski/rails-integration-testing-with-fixtures-a-practical-approach-for-complex-data-sets-mce
render_with_liquid: false
---

#### The Challenge of Realistic Test Data

I recently faced a unique challenge in writing integration specs for a Rails application. The goal was to simulate real-world complexity within our test environment, involving interactions across 13 models like orders, line items, and products. The catch? I needed to generate around 10,000 interrelated records, reflecting the kind of volume and complexity we see in production. Typically, I'd reach for the `factory_bot` gem for test data generation, but due to the sheer volume and the need for persistent data, this method proved too slow. My ideal solution needed to enable the insertion of a large volume of data into the database efficiently, mirroring production data characteristics as closely as possible.

#### Solution: Tapping into Production DB and Fixtures

After exploring several avenues, I discovered that leveraging Rails' default fixtures, combined with our staging database (which mirrors the last three months of production records), provided an unexpectedly effective solution. Here’s how I transformed real production data into a manageable, anonymized test suite:

```ruby
def fixture_creator(model, anonymized)
  File.open(
    "#{Rails.root}/spec/fixtures/#{model.table_name}.yml",
    "w+"
  ) do |f|
    fixture_data = {}
    model.in_batches(of: 100) do |batch|
      batch.each do |record|
        fixture_data["#{record.id}_#{fixture_data.size + 1}"] =
          record.attributes.dup.merge(anonymized)
      end
    end
    f.write fixture_data.to_yaml
  end
end
```

#### Exploring the Code

In this snippet, `fixture_creator` function does the heavy lifting:

1. **Batch Processing**: By processing the data in batches (`model.in_batches(of: 100)`), we efficiently handle large volumes of data without overwhelming memory usage.
2. **Unique Keys for Fixtures**: We create unique keys for each record (`"#{record.id}_#{fixture_data.size + 1}"`), ensuring each entry in our fixtures file is distinct and easily identifiable.
3. **Anonymization**: The `anonymized` parameter is a hash that overrides sensitive attributes with dummy values, crucial for maintaining data privacy.

This approach significantly speeds up the process compared to individually creating records via `factory_bot`. By directly exporting data from a staging environment (a subset of our production data), we ensure our tests are running against data that closely reflects real user interactions, both in volume and complexity.

#### Anonymization and Security

One key aspect of using production data for testing is ensuring all sensitive information is thoroughly anonymized. In my case, the `anonymized` hash includes mappings of original attribute names to anonymized values, applied to each record. This step is crucial not just for security and privacy, but also for complying with legal obligations like GDPR.

#### Conclusion

This method of generating fixtures from production data presents a robust way to create realistic, high-volume test environments for Rails applications. It's particularly useful when the test scenarios are complex, and the realism of data interrelations is crucial. While this approach worked well in my case, it's important to tailor the solution to the specific needs and constraints of your project and always prioritize data security in any testing strategy.
