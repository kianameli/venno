# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Ledger.destroy_all
Transaction.destroy_all

@user1 = User.create!(username: 'testUser1', password: '123456', email: 'test1@email.com', balance: 500.25)
@user2 = User.create!(username: 'testUser2', password: '123456', email: 'test2@email.com')
@user3 = User.create!(username: 'testUser3', password: '123456', email: 'test3@email.com')
@mayor = User.create!(username: 'mayor', password: '123456', email: 'mayor@email.com')
@james = User.create!(username: 'james', password: '123456', email: 'james@email.com')
@rolf = User.create!(username: 'rolf', password: '123456', email: 'rolf@email.com')
@edd = User.create!(username: 'edd', password: '123456', email: 'edd@email.com')
@kian = User.create!(username: 'kian', password: '123456', email: 'kian@email.com')
@yoda = User.create!(username: 'yoda', password: '123456', email: 'yoda@email.com')
puts "#{User.count} users created"

@ledger1 = Ledger.create!(user1: @user1, user2: @user2, settled: false)
@ledger2 = Ledger.create!(user1: @user1, user2: @user3, settled: false)
@ledger3 = Ledger.create!(user1: @kian, user2: @mayor, settled: false)
@ledger4 = Ledger.create!(user1: @kian, user2: @yoda, settled: false)
@ledger5 = Ledger.create!(user1: @kian, user2: @edd, settled: false)
puts "#{Ledger.count} ledgers created"

@txn1 = Transaction.create!(ledger: @ledger1, originator: @user1, payer: @user1, payee: @user2, amount: 11.11, reason: "test txn 1", approved: true)
@txn2 = Transaction.create!(ledger: @ledger1, originator: @user1, payer: @user1, payee: @user2, amount: 22.22, reason: "test txn 2", approved: true)
@txn3 = Transaction.create!(ledger: @ledger2, originator: @user1, payer: @user1, payee: @user3, amount: 33.33, reason: "test txn 3", approved: true)
@txn4 = Transaction.create!(ledger: @ledger4, originator: @kian, payer: @yoda, payee: @kian, amount: 33.33, reason: "star wars stuff", approved: true)
@txn5 = Transaction.create!(ledger: @ledger4, originator: @kian, payer: @yoda, payee: @kian, amount: 23.25, reason: "more star wars stuff", approved: true)
@txn6 = Transaction.create!(ledger: @ledger4, originator: @yoda, payer: @yoda, payee: @kian, amount: 78.00, reason: "service to the republic", approved: true)
@txn7 = Transaction.create!(ledger: @ledger4, originator: @yoda, payer: @kian, payee: @yoda, amount: 15.99, reason: "shipping and handling", approved: true)
@txn8 = Transaction.create!(ledger: @ledger5, originator: @edd, payer: @edd, payee: @kian, amount: 1.25, reason: "a cheap purchase", approved: true)
puts "#{Transaction.count} txns created"




