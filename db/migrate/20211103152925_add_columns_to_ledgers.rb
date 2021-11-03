class AddColumnsToLedgers < ActiveRecord::Migration[6.1]
  def change
    add_reference :ledgers, :user1_id, foreign_key: {to_table: :users}
    add_reference :ledgers, :user2_id, foreign_key: {to_table: :users}
  end
end
