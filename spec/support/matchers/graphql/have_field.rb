# frozen_string_literal: true

RSpec::Matchers.define :have_field do |field_name|
  match do |matched_type|
    field = matched_type.fields.with_indifferent_access[field_name]

    if @type.present?
      field.present? && field.type.unwrap == @type
    else
      field.present?
    end
  end

  chain :that_returns_type do |type|
    @type = type
  end
end
