import org.json.simple.JSONArray;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

public class Message {

    private String ID;
    private String username;
    private String message;

    public Message() {

    }

    public Message(String ID, String username, String message) {
        this.ID = ID;
        this.username = username;
        this.message = message;
    }

    public Message(String username, String message) {
        this.message = message;
        this.username = username;
        this.ID = uniqueId();
    }

    public Message(String ID) {
        this.ID = ID;
    }

    public Message(Message message) {
        this.ID = message.getId();
        this.username = message.getUsername();
        this.message = message.getMessage();
    }

    public Message(Object o) {
        Message message = (Message)o;
        this.ID = message.getId();
        this.message = message.getMessage();
        this.username = message.getUsername();
    }

    public String uniqueId() {
        String ID = UUID.randomUUID().toString();
        return ID;
    }

    public String getId() {
        return this.ID;
    }
    public void setId(String id) {
        this.ID = id;
    }

    public String getUsername() {
        return this.username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return this.message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}