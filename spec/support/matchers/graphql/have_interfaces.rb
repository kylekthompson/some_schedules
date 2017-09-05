# frozen_string_literal: true

RSpec::Matchers.define :have_interfaces do |*interfaces|
  match do |type|
    interfaces.all? { |interface| type.interfaces.include?(interface) }
  end
end
