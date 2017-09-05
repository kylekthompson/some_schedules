# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Relay::GlobalID::Encode, type: :model do
  subject(:schema) { described_class }

  let(:user) { create(:user) }

  before do
    allow(GraphQL::Schema::UniqueWithinType).to receive(:encode).and_call_original
  end

  it "uses graphql-ruby's encode helper" do
    described_class.call(user, User, nil)
    expect(GraphQL::Schema::UniqueWithinType).to have_received(:encode)
  end
end
