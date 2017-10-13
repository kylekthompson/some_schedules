# frozen_string_literal: true

class MakeCompaniesAndUsersOneToMany < ActiveRecord::Migration[5.1]
  def up
    add_reference :users, :company, foreign_key: true
    add_column :users, :role, :integer

    if defined?(CompanyUser)
      CompanyUser.transaction do
        CompanyUser.includes(:company, :user).all.find_each do |company_user|
          company_user.user.update!(
            role: CompanyUser.roles[company_user.role],
            company_id: company_user.company.id
          )
        end
      end
    end

    drop_table :company_users
  end

  def down
    create_table :company_users do |t|
      t.references :company, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.integer :role, null: false

      t.timestamps
    end

    if defined?(CompanyUser)
      User.transaction do
        User.all.find_each do |user|
          CompanyUser.create!(
            company_id: user.company_id,
            user_id: user.id,
            role: user.role
          )
        end
      end
    end

    remove_column :users, :role
    remove_reference :users, :company, foreign_key: true
  end
end
