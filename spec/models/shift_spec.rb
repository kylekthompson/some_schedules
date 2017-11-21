# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Shift, type: :model do
  subject(:shift) { build(:shift) }

  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:start_time) }
  it { is_expected.to validate_presence_of(:end_time) }

  it { is_expected.to belong_to(:user) }

  describe 'validations' do
    context 'when setting the start and end time' do
      it 'requires the start time to be before the end time' do
        shift.start_time = shift.end_time
        expect(shift).not_to be_valid
      end
    end
  end

  describe '.for_company_id' do
    let(:company) { create(:company) }
    let(:user_in_company) { create(:user, company: company) }
    let!(:shift_for_user_in_company) { create(:shift, user: user_in_company) }

    before do
      create(:shift)
    end

    it 'includes shifts for only the expected company' do
      expect(described_class.for_company_id(company.id)).to contain_exactly(shift_for_user_in_company)
    end
  end
end
