# frozen_string_literal: true

RSpec::Matchers.define :have_return_type do |type|
  match do |field|
    field.type.unwrap == type
  end
end
