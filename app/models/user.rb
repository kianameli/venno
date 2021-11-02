class User < ApplicationRecord
  has_secure_password
  has_one :account
  
  has_many :originator_transactions, :foreign_key => 'originator_id'
  has_many :payer_transactions, :foreign_key => 'payer_id'
  has_many :payee_transactions, :foreign_key => 'payee_id'

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }

end
