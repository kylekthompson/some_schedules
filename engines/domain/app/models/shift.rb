# frozen_string_literal: true

class Shift < ApplicationRecord
  belongs_to :user
  has_one :company, through: :user

  validates :end_time, presence: true
  validates :start_time, presence: true
  validates :user, presence: true
  validate :start_time_is_before_end_time

  scope :for_company_id, ->(company_id) { joins(user: :company).where(users: { companies: { id: company_id } }) }

  private

  def start_time_is_before_end_time
    return if start_time.blank? || end_time.blank?
    return if start_time < end_time
    errors.add(:start_time, 'must be before end time')
  end

  class << self
    def after(time)
      return all if time.blank?
      where(arel_table[:start_time].gteq(time))
    end

    def before(time)
      return all if time.blank?
      where(arel_table[:start_time].lteq(time))
    end
  end
end
