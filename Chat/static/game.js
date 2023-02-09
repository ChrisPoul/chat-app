const socket = io()

socket.on("message", function (message) {
    $("#messages").append('<li>' + message + '</li>')
})

$("#message__form").submit(function () {
    let message = $("#message").val()
    socket.send(message)
    $("#message").val("")
})