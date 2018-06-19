# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Helpers::EmailFormatter, type: :model do
  subject(:formatter) { described_class }

  describe '.before_validation' do
    let(:object) { User.new(email: email) }

    context 'when the email is present' do
      let(:email) { 'SomeEmail@email.com' }

      it 'downcases the email' do
        formatter.before_validation(object)
        expect(object.email).to eq(email.downcase)
      end
    end

    context 'when the email is not present' do
      let(:email) { nil }

      it 'leaves the email as nil' do
        formatter.before_validation(object)
        expect(object.email).to be_nil
      end
    end
  end
end
