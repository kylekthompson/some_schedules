# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  it { is_expected.to validate_presence_of(:first_name) }
  it { is_expected.to validate_presence_of(:last_name) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { is_expected.to allow_value('a@b.c').for(:email) }
  it { is_expected.to allow_value('a.b.c@d.e').for(:email) }
  it { is_expected.not_to allow_value('a.b').for(:email) }
  it { is_expected.to have_secure_password }

  describe '#full_name' do
    specify { expect(user.full_name).to eq("#{user.first_name} #{user.last_name}") }
  end

  describe '#to_token_payload' do
    it 'uses the user email as the subject' do
      expect(user.to_token_payload).to eq(sub: user.email)
    end
  end

  describe '.from_token_request' do
    let(:user) { create(:user) }
    let(:request) { instance_double(ActionDispatch::Request, params: params) }

    context 'when passed valid params' do
      let(:params) { ActionController::Parameters.new(auth: { email: user.email }) }

      specify { expect(described_class.from_token_request(request)).to eq(user) }
    end

    context 'when passed invalid params' do
      let(:params) { ActionController::Parameters.new(auth: { email: 'other@email.com' }) }

      specify { expect(described_class.from_token_request(request)).to be_nil }
    end
  end

  describe '.from_token_payload' do
    let(:user) { create(:user) }

    context 'when passed valid params' do
      let(:payload) { { sub: user.email }.with_indifferent_access }

      specify { expect(described_class.from_token_payload(payload)).to eq(user) }
    end

    context 'when passed invalid params' do
      let(:payload) { { sub: 'other@email.com' }.with_indifferent_access }

      specify { expect(described_class.from_token_payload(payload)).to be_nil }
    end
  end
end
