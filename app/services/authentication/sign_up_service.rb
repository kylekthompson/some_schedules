# frozen_string_literal: true

module Authentication
  class SignUpService
    attr_reader :company_params, :current_user, :user_params

    def self.sign_up(company:, current_user:, user:)
      new(company: company, current_user: current_user, user: user).result
    end

    def initialize(company:, current_user:, user:)
      @company_params = company
      @current_user = current_user
      @user_params = user
    end

    def result
      company_result, user_result = register_user

      return errors(company_result, user_result) unless company_result&.success? && user_result&.success?

      registered(company_result, user_result)
    end

    private

    def register_user
      company_result = nil
      user_result = nil

      ::User.transaction do
        company_result = sign_up_company
        raise ActiveRecord::Rollback unless company_result.success?
        user_result = sign_up_user(company_result)
        raise ActiveRecord::Rollback unless user_result.success?
      end

      [company_result, user_result]
    end

    def sign_up_company
      Companies::SignUpService.sign_up(current_user: current_user, params: company_params)
    end

    def sign_up_user(company_result)
      params = user_params.merge(company: company_result.company, role: :owner)
      Users::SignUpService.sign_up(current_user: current_user, params: params)
    end

    def error_status_for(company_result, user_result)
      if company_result.present? && !company_result.success?
        company_result.status
      else
        user_result.status
      end
    end

    def errors(company_result, user_result)
      error = [company_result&.error, user_result&.error].compact.join('\n')
      errors = { company: company_result&.errors || {}, user: user_result&.errors || {} }
      status = error_status_for(company_result, user_result)

      OpenStruct.new(
        error: error,
        errors: errors,
        status: status,
        success?: false
      )
    end

    def registered(company_result, user_result)
      OpenStruct.new(
        authentication_context: Authentication::ContextService.build(user: user_result.user).context,
        company: company_result.company,
        status: :created,
        success?: true,
        token: Token::EncodeService.encode(user: user_result.user).token,
        user: user_result.user
      )
    end
  end
end
