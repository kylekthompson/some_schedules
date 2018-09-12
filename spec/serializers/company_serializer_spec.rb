# frozen_string_literal: true

require "rails_helper"

RSpec.describe CompanySerializer, type: :serializer do
  subject(:serializer) { described_class.new(company) }

  describe "serialization" do
    let(:company) { build(:company, :with_users) }
    let(:expected_keys) { %i[id created_at name updated_at] }

    it "serializes properly" do
      expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
    end
  end
end
