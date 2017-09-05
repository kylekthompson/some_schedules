# frozen_string_literal: true

RSpec::Matchers.define :have_query_type do |query_type|
  match do |schema|
    schema.query == query_type
  end
end
