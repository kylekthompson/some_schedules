# frozen_string_literal: true

class ChangeRoleOnUsersToString < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :role, :string, null: false
  end
end
