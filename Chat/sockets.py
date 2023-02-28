from flask_socketio import (
    SocketIO, send, emit, join_room, leave_room
)
from .models.message import Message

socketio = SocketIO()


@socketio.on("message")
def handle_message(message_json: dict[str, any]):
    message: Message = Message.schema.load(message_json)
    message.add()
    send(
        Message.schema.dump(message),
        broadcast=True,
        to=message.room
    )


@socketio.on('join')
def handle_join(data):
    room = data["room"]
    print(data)
    join_room(room)
    emit("join", data, to=room)


@socketio.on('leave')
def handle_leave(data):
    room = data["room"]
    print(data)
    leave_room(room)
    emit("leave", data, to=room)
