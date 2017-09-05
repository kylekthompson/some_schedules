# frozen_string_literal: true

RSpec::Matchers.define :have_field do |name, type|
  match do |matched_type|
    field = matched_type.fields.with_indifferent_access[name]
    field.present? && field.type.unwrap == type
  end
end
