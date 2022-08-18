package com.ssafy.five.exception.ChatHandler;


import com.ssafy.five.domain.service.RoomService;
import com.ssafy.five.domain.service.RoomSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    private final RoomService roomService;
    private final RoomSessionService roomSessionService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println(accessor);

        // 입장시 구현
        if (StompCommand.SUBSCRIBE == accessor.getCommand() && accessor.getDestination().startsWith("/sub/chat/room/")) {
            String[] splits = accessor.getDestination().split("/");
            long roomId = Long.parseLong(splits[splits.length-1]);
            String simpSessionId = (String) message.getHeaders().get("simpSessionId");
            roomSessionService.saveSession(simpSessionId, roomId);
            roomService.roomCount(roomId, -1);
        } else if (StompCommand.DISCONNECT == accessor.getCommand()) {
            String simpSessionId = (String) message.getHeaders().get("simpSessionId");
            Long roomId = roomSessionService.deleteSession(simpSessionId);
            if (roomId != 0l) {
                roomService.roomCount(roomId, 1);
            }
        }

        return message;

    }
}
