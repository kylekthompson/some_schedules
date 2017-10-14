# frozen_string_literal: true

class AddPublishedToShifts < ActiveRecord::Migration[5.1]
  def change
    add_column(:shifts, :published, :boolean, null: false, default: false)
  end
end
