# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Authentication::ContextSerializer, type: :serializer do
  subject(:serializer) { described_class.new(context) }

  describe "serialization" do
    let(:context) { API::Authentication::Context.new(user: build(:user)) }
    let(:expected_keys) { %i[is_signed_in role] }

    it "serializes properly" do
      expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
    end
  end
end
