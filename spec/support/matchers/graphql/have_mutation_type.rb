# frozen_string_literal: true

RSpec::Matchers.define :have_mutation_type do |mutation_type|
  match do |schema|
    schema.mutation == mutation_type
  end
end
