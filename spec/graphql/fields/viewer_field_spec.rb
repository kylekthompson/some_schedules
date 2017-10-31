# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fields::ViewerField, type: :model do
  describe '.field' do
    subject(:field) { described_class.field }

    it { is_expected.to have_return_type(Types::Object::UserType) }
    it { is_expected.to use_resolver(Resolvers::User::Viewer) }
  end
end
