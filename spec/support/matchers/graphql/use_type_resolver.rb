# frozen_string_literal: true

RSpec::Matchers.define :use_type_resolver do |resolver|
  match do |schema|
    schema.resolve_type_proc == resolver
  end
end
