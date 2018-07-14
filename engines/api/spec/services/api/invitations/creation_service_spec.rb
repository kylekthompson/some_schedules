# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Invitations::CreationService do
  class AllowedAbility
    def initialize(*); end

    def can_create?
      true
    end
  end

  class NotAllowedAbility
    def initialize(*); end

    def can_create?
      false
    end
  end

  let(:result) do
    described_class.create(
      current_user: user,
      ability: ability,
      **invitation_params,
    )
  end
  let(:user) { create(:user) }
  let(:invitation_params) { attributes_for(:invitation).except(:accepted) }

  describe ".create" do
    context "when creation is not allowed" do
      let(:ability) { NotAllowedAbility }

      it "raises" do
        expect { result }.to raise_error(API::Errors::NotAuthorizedError)
      end
    end

    context "when creation is allowed" do
      let(:ability) { AllowedAbility }
      let(:serialized) { result.serialize }

      it "does not raise" do
        expect { result }.not_to raise_error
      end

      context "when the invitation is created" do
        let(:invitation_params) { attributes_for(:invitation).except(:accepted) }

        it "serializes properly", :aggregate_failures do
          expect(result.status).to eq(:created)
          expect(serialized.keys.count).to eq(1)
          expect(serialized.fetch(:invitation).keys.count).to eq(6)
          expect(serialized.fetch(:invitation)).to include(
            id: be_present,
            created_at: be_present,
            updated_at: be_present,
            **invitation_params,
          )
        end
      end

      context "when the invitation is not created" do
        let(:invitation_params) { attributes_for(:invitation, email: nil).except(:accepted) }

        it "serializes properly", :aggregate_failures do
          expect(result.status).to eq(:unprocessable_entity)
          expect(serialized.keys.count).to eq(1)
          expect(serialized.fetch(:errors).keys.count).to eq(1)
        end
      end
    end
  end
end
