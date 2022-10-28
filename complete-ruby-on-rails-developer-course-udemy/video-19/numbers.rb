

def multiply(first_num, second_num)
    first_num.to_f * second_num.to_f
end

def divide(first_num, second_num)
    first_num.to_f / second_num.to_f
end

def substract(first_num, second_num)
    first_num.to_f - second_num.to_f
end

def add(first_num, second_num)
    first_num.to_f + second_num.to_f
end

def mod(first_num, second_num)
    first_num.to_f % second_num.to_f
end

puts "Simple calculator"
25.times { print "-" }

puts "Enter the first number"
num_1 = gets.chomp 
puts "Enter the second number"
num_2 = gets.chomp
puts "The first number multiplied by the second number is #{multiply(num_1,num_2)}"
puts "The first number dividied by the second number is #{divide(num_1,num_2)}"
puts "The first number substracted from the second number is #{substract(num_1,num_2)}"
puts "The first number added to the second number is #{add(num_1,num_2)}"
puts "The first number mod to the second number is #{mod(num_1,num_2)}"