class Transaction < ApplicationRecord
  belongs_to :originator, class_name: 'User', foreign_key: 'originator_id'
  belongs_to :payer, class_name: 'User', foreign_key: 'payer_id'
  belongs_to :payee, class_name: 'User', foreign_key: 'payee_id'

  
end
