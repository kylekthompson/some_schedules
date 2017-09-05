# frozen_string_literal: true

RSpec::Matchers.define :have_arguments do |*expected_arguments|
  match do |field|
    expected_arguments.all? { |arg| field.arguments.with_indifferent_access.key?(arg) }
  end
end
