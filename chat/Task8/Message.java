import java.util.UUID;

public class Message {

    private String ID;
    private String username;
    private String textMessage;

    public Message() {
        this.ID = "";
        this.username = "";
        this.textMessage = "";
    }

    public Message(String ID, String username, String textMessage) {
        this.ID = ID;
        this.username = username;
        this.textMessage = textMessage;
    }

    public Message(String username, String textMessage) {
        this.textMessage = textMessage;
        this.username = username;
        this.ID = uniqueId();
    }

    public Message(Message message) {
        this.ID = message.getId();
        this.username = message.getUsername();
        this.textMessage = message.getTextMessage();
    }

    public Message(Object o) {
        Message message = (Message)o;
        this.ID = message.getId();
        this.textMessage = message.getTextMessage();
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

    public String getTextMessage() {
        return this.textMessage;
    }
    public void setMessage(String message) {
        this.textMessage = message;
    }
}