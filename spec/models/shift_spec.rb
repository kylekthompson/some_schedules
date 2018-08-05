# frozen_string_literal: true

require "rails_helper"

RSpec.describe Shift, type: :model do
  subject(:shift) { build(:shift) }

  it { is_expected.to validate_presence_of(:user) }
  it { is_expected.to validate_presence_of(:start_time) }
  it { is_expected.to validate_presence_of(:end_time) }

  it { is_expected.to belong_to(:user) }

  describe "validations" do
    context "when setting the start and end time" do
      it "requires the start time to be before the end time" do
        shift.start_time = shift.end_time
        expect(shift).not_to be_valid
      end
    end
  end

  describe ".for_company" do
    let(:user_in_company) { create(:user) }
    let(:company) { create(:company, users: [user_in_company]) }
    let!(:shift_for_user_in_company) { create(:shift, user: user_in_company) }

    before do
      create(:shift)
    end

    it "includes shifts for only the expected company" do
      expect(described_class.for_company(company)).to contain_exactly(shift_for_user_in_company)
    end
  end

  describe ".after" do
    let(:time) { Time.current }
    let!(:exact_time_shift) { create(:shift, start_time: time) }
    let!(:after_time_shift) { create(:shift, start_time: time + 1.day) }

    before { create(:shift, start_time: time - 1.day) }

    it "includes shifts that start exactly at and after the provided time" do
      expect(described_class.after(time)).to contain_exactly(exact_time_shift, after_time_shift)
    end
  end

  describe ".before" do
    let(:time) { Time.current }
    let!(:before_time_shift) { create(:shift, start_time: time - 1.day) }
    let!(:exact_time_shift) { create(:shift, start_time: time) }

    before { create(:shift, start_time: time + 1.day) }

    it "includes shifts that start exactly at and before the provided time" do
      expect(described_class.before(time)).to contain_exactly(exact_time_shift, before_time_shift)
    end
  end

  describe ".published" do
    let!(:published_shift) { create(:shift, published: true) }

    before { create(:shift, published: false) }

    it "includes only published shifts" do
      expect(described_class.published).to contain_exactly(published_shift)
    end
  end
end
