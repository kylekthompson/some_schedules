# frozen_string_literal: true

class ChangeInvitationsUserIdToInvitedById < ActiveRecord::Migration[5.2]
  def change
    remove_column :invitations, :user_id
    add_reference :invitations, :invited_by, foreign_key: { to_table: :users }, null: false
  end
end
