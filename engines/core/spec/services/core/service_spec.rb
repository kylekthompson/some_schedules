# frozen_string_literal: true

require "rails_helper"

RSpec.describe Core::Service, type: :model do
  it "cannot be initialized" do
    expect { described_class.new }.to raise_error(NoMethodError, /private method .new. called/)
  end
end
