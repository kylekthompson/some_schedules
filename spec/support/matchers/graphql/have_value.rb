# frozen_string_literal: true

RSpec::Matchers.define :have_value do |expected_value|
  match do |enum|
    value = enum.values.with_indifferent_access[expected_value]

    if @ruby_value
      value.present? && value.value == @ruby_value
    else
      value.present?
    end
  end

  chain :that_has_ruby_value do |ruby_value|
    @ruby_value = ruby_value
  end
end
