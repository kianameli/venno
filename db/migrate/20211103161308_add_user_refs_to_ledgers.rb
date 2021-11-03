class AddUserRefsToLedgers < ActiveRecord::Migration[6.1]
  def change
    remove_reference :ledgers, :user1_id, null: false, foreign_key: {to_table: :users}
    remove_reference :ledgers, :user2_id, null: false, foreign_key: {to_table: :users}
    add_reference :ledgers, :user1, foreign_key: {to_table: :users}
    add_reference :ledgers, :user2, foreign_key: {to_table: :users}

  end
end
