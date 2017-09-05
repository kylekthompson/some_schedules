# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Relay::GlobalID::Decode, type: :model do
  subject(:schema) { described_class }

  let(:user) { create(:user) }
  let(:global_id) { Relay::GlobalID::Encode.call(user, User, nil) }

  before do
    allow(GraphQL::Schema::UniqueWithinType).to receive(:decode).and_call_original
    allow(Resolvers::User::Finder).to receive(:call).and_return(nil)
  end

  it "uses graphql-ruby's decode helper" do
    described_class.call(global_id, nil)
    expect(GraphQL::Schema::UniqueWithinType).to have_received(:decode)
  end

  it 'uses the correct finder' do
    described_class.call(global_id, nil)
    expect(Resolvers::User::Finder).to have_received(:call)
  end
end
