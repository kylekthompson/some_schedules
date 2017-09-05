# frozen_string_literal: true

RSpec::Matchers.define :use_resolver do |resolver|
  match do |field|
    field.resolve_proc == resolver
  end
end
