# frozen_string_literal: true

RSpec::Matchers.define :have_return_field do |name|
  match do |field|
    return_field = field.mutation.fields.with_indifferent_access[name]

    if @type
      return_field.present? && return_field.type.unwrap == @type
    else
      return_field.present?
    end
  end

  chain :of_type do |type|
    @type = type
  end
end
