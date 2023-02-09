const socket = io()

socket.on("message", function (message) {
    $("#messages").append('<li class="message">' + message + '</li>')
})

$("#message-form").submit(function (event) {
    event.preventDefault()
    let message = $("#message").val()
    socket.send(message)
    $("#message").val("")
})