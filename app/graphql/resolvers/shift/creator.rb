# frozen_string_literal: true

module Resolvers
  module Shift
    class Creator
      SHIFT_AUTHORIZATION_ERROR_MESSAGE = 'Not authorized to create a shift with those parameters'

      include ActiveModel::Validations

      validates :user, presence: true

      attr_accessor :current_user, :end_time, :shift, :start_time, :user

      ##
      # An entry point that simulates a Proc to create a Shift
      #
      # Requires a user to be logged in
      #
      # [1] pry(main)> context = { current_user: User.first }
      # [2] pry(main)> arguments = { start_time: Time.current.to_s, end_time: 1.hour.from_now.to_s, user_id: 1 }
      # [3] pry(main)> Resolvers::Shift::Creator.call(nil, arguments, context)
      # => { shift: #<Shift user_id: 1> }
      def self.call(_object, arguments, context)
        Resolvers.require_authentication!(context)
        new(arguments.to_h.with_indifferent_access.merge(current_user: context[:current_user])).to_h
      end

      ##
      # Creates a new instance of the Resolvers::Shift::Creator
      #
      # [1] pry(main)> arguments = { start_time: Time.current.to_s, end_time: 1.hour.from_now.to_s, user_id: 1 }
      # [2] pry(main)> Resolvers::Shift::Creator.new(arguments)
      # => #<Resolvers::Shift::Creator>
      def initialize(arguments)
        @current_user = arguments[:current_user]
        @end_time = arguments[:end_time]
        @start_time = arguments[:start_time]
        @user = ::User.find_by(id: arguments[:user_id])
      end

      ##
      # Returns the hash representation of the result of creating a shift (either errors or a shift)
      #
      # [1] pry(main)> arguments = { start_time: Time.current.to_s, end_time: 1.hour.from_now.to_s, user_id: 1 }
      # [2] pry(main)> creator = Resolvers::Shift::Creator.new(arguments)
      # [3] pry(main)> creator.to_h
      # => { shift: #<Shift> }
      def to_h
        return { errors: errors.messages } unless valid?
        create_shift
        return { errors: shift.errors.messages } unless shift.valid?
        { shift: shift }
      end

      private

      def create_shift
        @shift = user.shifts.build(end_time: end_time, start_time: start_time)

        raise GraphQL::ExecutionError, SHIFT_AUTHORIZATION_ERROR_MESSAGE unless Policy.for(
          current_user: current_user,
          subject: shift
        ).can_create?

        shift.save
      end
    end
  end
end
