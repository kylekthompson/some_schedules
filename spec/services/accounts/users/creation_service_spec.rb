# frozen_string_literal: true

require "rails_helper"

RSpec.describe Accounts::Users::CreationService do
  describe ".create" do
    let(:user) { described_class.create(params) }
    let(:params) { attributes_for(:user) }

    it "creates a user" do
      expect { user }.to change(User, :count).by(1)
    end
  end
end
