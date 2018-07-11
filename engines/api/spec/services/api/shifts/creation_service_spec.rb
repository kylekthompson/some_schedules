# frozen_string_literal: true

require "rails_helper"

RSpec.describe API::Shifts::CreationService do
  class AllowedAbility
    def initialize(*); end

    def can_create?(*)
      true
    end
  end

  class NotAllowedAbility
    def initialize(*); end

    def can_create?(*)
      false
    end
  end

  let(:result) do
    described_class.create(
      current_user: user,
      ability: ability,
      **shift_params,
    )
  end
  let(:user) { create(:user) }
  let(:shift_params) { attributes_for(:shift).merge(user: user) }

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

      context "when the shift is created" do
        let(:shift_params) { attributes_for(:shift).merge(user: user) }

        it "serializes properly", :aggregate_failures do
          expect(result.status).to eq(:created)
          expect(serialized.keys.count).to eq(1)
          expect(serialized.fetch(:shift).keys.count).to eq(6)
          expect(serialized.fetch(:shift)).to include(
            id: be_present,
            created_at: be_present,
            updated_at: be_present,
            user: be_present,
            **shift_params.except(:user),
          )
        end
      end

      context "when the shift is not created" do
        let(:shift_params) { attributes_for(:shift, start_time: nil).merge(user: user) }

        it "serializes properly", :aggregate_failures do
          expect(result.status).to eq(:unprocessable_entity)
          expect(serialized.keys.count).to eq(1)
          expect(serialized.fetch(:errors).keys.count).to eq(1)
        end
      end
    end
  end
end
