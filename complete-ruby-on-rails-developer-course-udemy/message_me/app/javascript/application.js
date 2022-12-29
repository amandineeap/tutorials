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

// $(function() {     
//   $( document ).ready(function() {
//     // console.log('hello')
//     // $(".ui.dropdown").dropdown();   
//   });
// }); 


window.scroll_bottom = function(){
  if($('#messages').length > 0){
    $('#messages').scrollTop($('#messages')[0].scrollHeight)
  }
}

window.submit_message = function(){
  $('#message_body').on('keydown', function(e) {
    if (e.key === 'Enter'){
      $('button').click()
      e.target.value = ""
    }
  })
}

$(document).ready(function(){
  scroll_bottom()
  submit_message()
})

// import "./channels"
import "./channels/chatroom_channel"
