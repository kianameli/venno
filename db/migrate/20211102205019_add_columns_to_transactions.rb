class AddColumnsToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions :originator_id 
    
  end
end
