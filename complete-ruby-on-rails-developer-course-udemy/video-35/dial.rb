dial_book = {
  "newyork"=> "111",
  "miami"=>"322",
  "boston"=> "455",
  "orlando"=> "900"
}

def get_city_names(hash)
  hash.keys
end

def get_area_code(hash, key)
  hash[key]
end

loop do
  puts "do you want to look up an area code based on a city name?"
  answer = gets.chomp.downcase
  break if answer != "y"

  puts "all cities"
  puts get_city_names(dial_book)
  puts "select a city"
  city = gets.chomp.downcase
  if dial_book.has_key?(city) # dial_book.include?(city)
    puts "area code"
    puts "the area code for #{city} is #{get_area_code(dial_book, city)}"
  else
    puts "city is not listed" 
    break
  end
end