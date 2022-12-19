# require 'bcrypt'
 
# my_password = BCrypt::Password.create("my password")
# puts my_password
#   #=> "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa"
 
# # puts my_password.version              #=> "2a"
# # puts my_password.cost                 #=> 10
# # puts my_password == "my password"     #=> true
# # puts my_password == "not my password" #=> false
 
# my_password = BCrypt::Password.new("$2a$12$pSSTcO62HuNk441VFKmMx.EpU50DBD.YIWnHK3DEThmA7aaac8RCi")
# puts my_password == "my password"     #=> true
# # puts my_password == "not my password" #=> false



####

require_relative 'crud' # current directory
# require 'crud' # current directory

# $LOAD_PATH << "."
# require 'crud'

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

hashed_users = Crud.create_secure_users(users)
puts hashed_users