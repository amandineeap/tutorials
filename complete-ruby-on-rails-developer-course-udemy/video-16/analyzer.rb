puts "Enter your first name"
first_name = gets.chomp

puts "Enter your last name"
last_name = gets.chomp

puts "Your full name is #{first_name} #{last_name}"
puts "Your last name is #{last_name.reverse} #{first_name.reverse}"
puts "Your name has #{last_name.length + first_name.length} characters in it"