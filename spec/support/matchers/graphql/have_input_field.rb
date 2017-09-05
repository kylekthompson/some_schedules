# frozen_string_literal: true

RSpec::Matchers.define :have_input_field do |argument|
  match do |field|
    argument = field.mutation.arguments.with_indifferent_access[argument]

    if @type.present?
      argument.present? && argument.type.unwrap == @type
    else
      argument.present?
    end
  end

  chain :of_type do |type|
    @type = type
  end
end
