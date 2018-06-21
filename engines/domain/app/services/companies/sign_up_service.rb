# frozen_string_literal: true

module Companies
  class SignUpService
    attr_reader :current_user, :params

    def self.sign_up(current_user: nil, params:)
      new(current_user: current_user, params: params).result
    end

    def initialize(current_user: nil, params:)
      @current_user = current_user
      @params = params
    end

    def result
      company = Company.new(params)

      return unauthorized unless can_create?(company)
      return created(company) if company.save

      errors(company)
    end

    private

    def can_create?(company)
      Policy.for(current_user: current_user, subject: company).can_create?
    end

    def unauthorized
      OpenStruct.new(
        error: I18n.t!('services.companies.sign_up.unauthorized'),
        status: :forbidden,
        success?: false
      )
    end

    def created(company)
      OpenStruct.new(
        company: company,
        status: :created,
        success?: true
      )
    end

    def errors(company)
      OpenStruct.new(
        errors: company.errors.messages,
        status: :unprocessable_entity,
        success?: false
      )
    end
  end
end
