# frozen_string_literal: true

module Resolvers
  module Company
    class Creator
      include ActiveModel::Validations

      validates :name, presence: true
      validates :slug, presence: true
      validate :signed_in?

      attr_accessor :company, :name, :slug, :user

      def self.call(_obj, args, ctx)
        new(args.to_h.with_indifferent_access.merge(user: ctx[:current_user])).to_h
      end

      def initialize(args)
        @name = args[:name]
        @slug = args[:slug]
        @user = args[:user]
      end

      def to_h
        return { errors: errors.messages } unless valid?
        create_company
        return { errors: company.errors.messages } unless company.valid?
        { company: company }
      end

      private

      def signed_in?
        errors.add(:user, 'must be signed in') unless user.present?
      end

      def create_company
        @company = ::Company.new(name: name, slug: slug)
        company.company_users.build(role: :owner, user: user)
        company.save
      end
    end
  end
end
