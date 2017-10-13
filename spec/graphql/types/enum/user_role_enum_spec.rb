# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Enum::UserRoleEnum, type: :model do
  subject(:type) { described_class }

  it { is_expected.to have_value('OWNER').that_has_ruby_value('owner') }
  it { is_expected.to have_value('MANAGER').that_has_ruby_value('manager') }
  it { is_expected.to have_value('SUPERVISOR').that_has_ruby_value('supervisor') }
  it { is_expected.to have_value('EMPLOYEE').that_has_ruby_value('employee') }
end
