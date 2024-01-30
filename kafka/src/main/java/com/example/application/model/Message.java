package com.example.application.model;

import dev.hilla.Nonnull;

import java.time.Instant;

public class Message {

    private @Nonnull String text;
    private Instant time;
    private @Nonnull String userName;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}
