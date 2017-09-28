# frozen_string_literal: true

RSpec::Matchers.define :have_argument do |argument|
  match do |field|
    argument = field.arguments.with_indifferent_access[argument]

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
