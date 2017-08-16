# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Companies::Creator, type: :model do
  subject(:creator) { described_class.new(user: user, params: params) }

  let(:user) { create(:user) }

  describe '#create' do
    context 'when the params are valid' do
      let(:params) { ActionController::Parameters.new(company: attributes_for(:company)) }

      specify { expect { creator.create }.to change { Company.count }.by(1) }
      specify { expect(creator.create).to be_success }

      it 'correctly adds the user to the company as an owner' do
        company = creator.create.value
        expect(company.company_users.first.role).to eq('owner')
      end
    end

    context 'when the params are not valid' do
      let(:params) do
        ActionController::Parameters.new(company: attributes_for(:company).tap { |c| c[:name] = nil })
      end

      specify { expect { creator.create }.not_to(change { Company.count }) }
      specify { expect(creator.create).to be_failure }
    end
  end
end
