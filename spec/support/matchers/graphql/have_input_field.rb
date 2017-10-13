# frozen_string_literal: true

RSpec::Matchers.define :have_input_field do |argument|
  match do |field|
    arguments = if field.mutation.present?
                  field.mutation.arguments.with_indifferent_access
                else
                  field.arguments.with_indifferent_access
                end

    argument = arguments[argument]

    if @type
      argument.present? && argument.type.unwrap == @type
    else
      argument.present?
    end
  end

  chain :of_type do |type|
    @type = type
  end
end
