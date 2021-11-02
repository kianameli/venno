# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Account.destroy_all

@user1 = User.create!(username: 'test1', password: '123456', email: 'test1@email.com')
@user2 = User.create!(username: 'test2', password: '123456', email: 'test2@email.com')
@user3 = User.create!(username: 'test3', password: '123456', email: 'test3@email.com')
Account.create!(user_id: @user1.id, balance: 0.00)
Account.create!(user_id: @user2.id, balance: 0.00)
Account.create!(user_id: @user3.id, balance: 0.00)
puts "#{User.count} users created"
puts "#{Account.count} accts created"




