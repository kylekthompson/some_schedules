# frozen_string_literal: true

class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'pgcrypto'

    create_table :invitations, id: :uuid do |t|
      t.references :user, foreign_key: true, null: false
      t.string :email, null: false, unique: true
      t.boolean :accepted, null: false, default: false
      t.datetime :expires_at, null: false, default: -> { "now() + interval '1 day'" }

      t.timestamps
    end
  end
end
