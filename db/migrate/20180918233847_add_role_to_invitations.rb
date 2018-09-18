# frozen_string_literal: true

class AddRoleToInvitations < ActiveRecord::Migration[5.2]
  def change
    add_column :invitations, :role, :string, null: false
  end
end
