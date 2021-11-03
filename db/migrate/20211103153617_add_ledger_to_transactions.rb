class AddLedgerToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_reference :transactions, :ledger, null: false, foreign_key: {to_table: :ledgers}
  end
end
