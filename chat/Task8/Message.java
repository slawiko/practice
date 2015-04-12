import java.util.Date;

public class Message {

    private int id;
    private String username;
    private String message;

    public Message() {

    }

    public Message(int id, String username, String message) {
        this.id = id;
        this.message = message;
        this.username = username;
    }

    public Message(String username, String message) {
        this.message = message;
        this.username = username;
    }

    public Message(int id, String message) {
        this.id = id;
        this.message = message;
    }

    public Message(int id) {
        this.id = id;
    }

    public Message(Message message) {
        this.id = message.getId();
        this.username = message.getUsername();
        this.message = message.getMessage();
    }

    public int uniqueId() {
        Date date = new Date();
        int random = (int)Math.random() * (int)Math.random();

        return date.getSeconds() * random;
    }

    public int getId() {
        return this.id;
    }
    public void setId(int id) {
        this.id = id;
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