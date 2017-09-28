# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Company::Finder, type: :model do
  subject(:resolver) { described_class }

  let(:company) { create(:company) }
  let(:result) { resolver.call(obj, args, ctx) }
  let(:obj) { nil }
  let(:args) { nil }
  let(:ctx) { nil }

  context 'when passed a slug' do
    let(:args) { { slug: slug } }
    let(:slug) { company.slug }

    specify { expect(result).to eq(company) }

    context 'but the slug does not exist' do
      let(:slug) { super() + '-does-not-exist' }

      specify { expect(result).to be_nil }
    end
  end

  context 'when passed a user_id' do
    let(:user) { create(:user) }
    let(:company_where_employee) { create(:company) }
    let(:company_where_owner) { create(:company) }
    let(:args) { { user_id: user_id } }
    let(:user_id) { user.id }

    before do
      company_where_employee.company_users << create(:company_user, :employee, user: user)
      company_where_owner.company_users << create(:company_user, :owner, user: user)
      create(:company, :with_employee)
    end

    it 'grabs companies for that user' do
      expect(result).to contain_exactly(company_where_employee, company_where_owner)
    end

    context 'and a role that exists in the company' do
      let(:args) { super().merge(role: :owner) }

      it 'grabs companies where the user has that role' do
        expect(result).to contain_exactly(company_where_owner)
      end
    end

    context 'and a role that does not exist in the company' do
      let(:args) { super().merge(role: :manager) }

      specify { expect(result).to be_empty }
    end

    context 'but the user_id does not exist' do
      let(:user_id) { super() + 1000 }

      specify { expect(result).to be_empty }
    end
  end
end
