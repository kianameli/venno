class RemoveRefsFromTransactions < ActiveRecord::Migration[6.1]
  def change
    remove_reference :transactions, :user1, null: false, foreign_key: {to_table: :users}
    remove_reference :transactions, :user2, null: false, foreign_key: {to_table: :users}
  end
end
