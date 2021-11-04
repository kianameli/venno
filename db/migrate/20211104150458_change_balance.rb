class ChangeBalance < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :balance, :decimal, precision: 7, scale: 2
  end
end
