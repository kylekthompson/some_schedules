# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::User::Creator, type: :model do
  subject(:resolver) { described_class }

  it 'does not create a user yet' do
    expect { resolver.call(nil, nil, nil) }.not_to(change { User.count })
  end
end
