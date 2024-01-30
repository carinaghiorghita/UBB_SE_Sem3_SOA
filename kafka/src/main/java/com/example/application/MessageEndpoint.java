package com.example.application;

import com.example.application.model.Message;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.EmitResult;
import reactor.core.publisher.Sinks.Many;

import java.time.Instant;

@Endpoint
@AnonymousAllowed
public class MessageEndpoint {

    @Value("${topic.name}")
    private String topicName;

    private final Many<Message> chatSink;
    private final Flux<Message> chat;

    private final KafkaTemplate<String, Message> kafkaTemplate;

    MessageEndpoint(KafkaTemplate<String, Message> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
        chatSink = Sinks.many().multicast().directBestEffort();
        chat = chatSink.asFlux();
    }

    public Flux<Message> join() {
        return chat;
    }

    public void send(Message message) {
        message.setTime(Instant.now());
        kafkaTemplate.send(topicName, message);
    }

    @KafkaListener(topics = "chat", groupId = "chat-group")
    private void consumer(Message message) {
        chatSink.emitNext(message,
            (signalType, emitResult) -> emitResult == EmitResult.FAIL_NON_SERIALIZED);
    }
}
