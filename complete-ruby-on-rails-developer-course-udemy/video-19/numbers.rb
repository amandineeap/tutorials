puts "Simple calculator"
25.times { print "-" }

puts "Enter the first number"
num_1 = gets.chomp 
puts "Enter the second number"
num_2 = gets.chomp
puts "The first number multiplied by the second number is #{num_1.to_i * num_2.to_i}"
puts "The first number dividied by the second number is #{num_1.to_i / num_2.to_i}"
puts "The first number substracted from the second number is #{num_2.to_i - num_1.to_i}"
puts "The first number added to the second number is #{num_1.to_i + num_2.to_i}"
puts "The first number mod to the second number is #{num_1.to_i % num_2.to_i}"
