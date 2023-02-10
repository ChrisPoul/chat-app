const socket = io()

socket.on("message", function (message) {
    let date = new Date(message["sent_at"])
    let sent_at_formated = date.toLocaleString('mx-ES', { hour: '2-digit', minute: '2-digit' })
    let sent_at_html = '<div class="message__time-sent">' + sent_at_formated + '</div>'
    let message_html = '<li class="message">' + message["contents"] + sent_at_html + '</li>'
    $("#messages").append(message_html)
})

$("#message-form").submit(function (event) {
    event.preventDefault()
    let message = $("#message").val()
    socket.send(message)
    $("#message").val("")
})