# frozen_string_literal: true

require "rails_helper"

RSpec.describe UserSerializer, type: :serializer do
  subject(:serializer) { described_class.new(user) }

  describe "serialization" do
    let(:expected_keys) { %i[id company created_at email first_name last_name role updated_at] }

    context "when the user is part of a company" do
      let(:user) { create(:user) }

      it "serializes properly", :aggregate_failures do
        expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
        expect(serializer.serializable_hash.fetch(:company)).to be_nil
      end
    end

    context "when the user is not part of a company" do
      let(:user) { create(:user, :in_company) }

      it "serializes properly", :aggregate_failures do
        expect(serializer.serializable_hash.keys).to contain_exactly(*expected_keys)
        expect(serializer.serializable_hash.fetch(:company)).to be_present
      end
    end
  end
end
