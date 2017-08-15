# frozen_string_literal: true

module Companies
  class Creator
    attr_reader :company, :company_attributes, :company_user, :user

    def initialize(user:, params:)
      @company_attributes = params.require(:company).permit(
        :name,
        :slug
      )
      @user = user
    end

    def create
      Company.transaction do
        create_company
        assign_user_to_company_as_owner
      end

      APIResponse.new(status: :created, value: company)
    rescue StandardError
      errors = company.errors.any? ? company.errors.messages : company_user.errors.messages
      APIResponse.new(status: :unprocessable_entity, errors: errors)
    end

    private

    def create_company
      @company = Company.new(company_attributes)
      company.save!
    end

    def assign_user_to_company_as_owner
      @company_user = company.company_users.build(role: :owner, user: user)
      company_user.save!
    end
  end
end
