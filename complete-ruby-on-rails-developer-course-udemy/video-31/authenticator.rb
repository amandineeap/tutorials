users = [
  {
      username: "amandine", password: "password1"
  },
  {
      username: "gunner", password: "password2"
  },
  {
      username: "cachou", password: "password3"
  }
]

def auth_user(username, password, list_of_users)
  list_of_users.each do |user|
    if user[:username] == username && user[:password] == password
      return user
    end
  end
  "credentials were not correct"
end

puts "welcome to the authenticator"
25.times { print "-"}

puts "this program will take input from the user and compare password"
puts "if password is correct, you will get back the user object"

attempts = 1
while attempts < 4
  print "username: "
  username = gets.chomp
  print "password: "
  password = gets.chomp
  authentication = auth_user(username, password, users)
  puts authentication

  puts "press n to quit or any other key to continue"
  input = gets.chomp.downcase
  break if input == "n"
  attempts += 1
end
puts "you have exceeded the number of attempts"