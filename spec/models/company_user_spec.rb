# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CompanyUser, type: :model do
  subject(:company_user) { build(:company_user) }

  it { is_expected.to validate_presence_of(:company) }
  it { is_expected.to validate_presence_of(:role) }
  it { is_expected.to validate_presence_of(:user) }

  it { is_expected.to belong_to(:company) }
  it { is_expected.to belong_to(:user) }

  describe '#role' do
    ROLES = %i[owner manager supervisor employee].freeze

    ROLES.each_with_index do |role, index|
      it 'has the correct index' do
        expect(described_class.roles[build(:company_user, role: role).role]).to eq(index)
      end
    end
  end
end
