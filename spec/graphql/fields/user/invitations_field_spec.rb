# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fields::User::InvitationsField, type: :model do
  describe '.field' do
    subject(:field) { described_class.field }

    it { is_expected.to have_return_type(Types::Object::InvitationType) }
    it { is_expected.to use_resolver(Resolvers::User::InvitationFinder) }
  end
end
