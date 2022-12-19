require_relative "crud"

class Student
  include Crud

  attr_accessor :first_name, :last_name, :email, :username, :password

  def initialize(first_name, last_name, email, username, password)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @username = username
    @password = password
  end

  # def first_name=(name) # setter type notation
  #   @first_name = name
  # end

  # def first_name # accessor
  #   @first_name
  # end

  # def username
  #   "user_#{first_name}"
  # end

  def to_s # override default method from class
    "First name: #{@first_name}, Last name: #{@last_name}"
  end

end

amandine = Student.new("amandine", "eap", "me@me.com", "amandine", "password")
gunner = Student.new("gunner", "best", "best@me.com", "gunner", "password1")

# puts amandine
# puts gunner

hashed_password = amandine.create_hash_digest(amandine.password)
puts hashed_password