# frozen_string_literal: true

class AddAdminBooleanToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :admin, :boolean, null: false, default: false
  end
end
