require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to validate_presence_of(:first_name) }
  it { is_expected.to validate_presence_of(:last_name) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to allow_value('a@b.c').for(:email) }
  it { is_expected.to allow_value('a.b.c@d.e').for(:email) }
  it { is_expected.not_to allow_value('a.b').for(:email) }
  it { is_expected.to have_secure_password }

  describe '#full_name' do
    specify { expect(subject.full_name).to eq("#{subject.first_name} #{subject.last_name}") }
  end
end
