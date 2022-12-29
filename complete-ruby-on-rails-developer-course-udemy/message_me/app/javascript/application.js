// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"
import "jquery_ujs"

//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require semantic-ui
//= require_tree .

$(function() {     
  $( document ).ready(function() {
    console.log('hello')
    // $(".ui.dropdown").dropdown();   
  });
}); 

