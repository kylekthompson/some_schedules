# frozen_string_literal: true

require "rails_helper"

RSpec.describe NilUser, type: :model do
  subject(:nil_user) { described_class.new }

  User.columns.each do |column|
    describe "##{column.name}" do
      it "is nil" do
        expect(nil_user.public_send(column.name)).to be_nil
      end
    end
  end

  describe "#authenticate" do
    let(:user) { instance_double(User, authenticate: nil) }

    before { allow(User).to receive(:new).and_return(user) }

    it "returns false" do
      expect(nil_user.authenticate("password")).to eq(false)
    end

    it "authenticates against a fake user" do
      nil_user.authenticate("password")
      expect(user).to have_received(:authenticate)
    end
  end

  describe "#persisted?" do
    it "is not persisted" do
      expect(nil_user).not_to be_persisted
    end
  end
end
