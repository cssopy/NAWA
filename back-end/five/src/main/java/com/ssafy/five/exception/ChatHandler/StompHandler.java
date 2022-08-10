package com.ssafy.five.exception.ChatHandler;


import com.ssafy.five.domain.service.RoomService;
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

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println(accessor.getDestination());

        if (accessor.getDestination() != null && accessor.getDestination().startsWith("/sub/chat/room/")) {
            if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
                String roomId = (String) ((List) Objects.requireNonNull((Map) message.getHeaders().get("nativeHeaders")).get("roomId")).get(0);
                roomService.roomCount(Long.parseLong(roomId) , -1);
            } else if (StompCommand.UNSUBSCRIBE == accessor.getCommand()) {
                String roomId = (String) ((List) Objects.requireNonNull((Map) message.getHeaders().get("nativeHeaders")).get("id")).get(0);
                roomService.roomCount(Long.parseLong(roomId), 1);
            }
        }

        return message;

    }
}
