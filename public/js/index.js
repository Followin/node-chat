const socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var li = $('<li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  var $message = $('[name="message"]');
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $message.val()
  });

  $message.val('');
});