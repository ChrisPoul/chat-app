const socket = io()

function join() {
    let message = {
        "contents": "Alguien se unió",
        "room": "Room 1",
    }
    socket.emit('join', message)
}
function leave() {
    let message = {
        "contents": "Alguien se fue",
        "room": "Room 1",
    }
    socket.emit('leave', message)
}

socket.on('connect', function () {
    join()
    console.log("Conectados!")
})
socket.on('disconnect', function () {
    leave()
    console.log("Desconectados!")
})
socket.on('leave', function (message) {
    console.log("Left room: " + message["room"])
})
socket.on('join', function (message) {
    console.log("Joined room: " + message["room"])
})

socket.on("message", function (message) {
    let date = new Date(message["sent_at"])
    let sent_at_formated = date.toLocaleString('mx-ES', { hour: '2-digit', minute: '2-digit' })
    let sent_at_html = '<div class="message__time-sent">' + sent_at_formated + '</div>'
    let message_html = '<li class="message">' + message["contents"] + sent_at_html + '</li>'
    $("#messages").append(message_html)
})

$("#message-form").submit(function (event) {
    event.preventDefault()
    let message_contents = $("#message").val()
    let message = {
        "contents": message_contents,
        "room": "Room 1",
    }
    socket.send(message)
    $("#message").val("")
})