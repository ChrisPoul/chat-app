from marshmallow import (
    Schema, fields, post_load
)


class MessageSchema(Schema):
    contents = fields.String(required=True,)
    sent_at = fields.DateTime(dump_only=True)

    @post_load
    def make_message(self, message_data: dict[str, any], **kwargs):
        from .message import Message
        return Message(**message_data)
