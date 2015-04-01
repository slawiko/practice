public class Message {

    private int id;
    private String username;
    private String message;

    public Message(int id, String username, String message) {

        this.id = id;
        this.message = message;
        this.username = username;
    }

    public int getId() {

        return this.id;
    }

    public String getUsername() {

        return this.username;
    }

    public String getMessage() {

        return this.message;
    }

    public void setId(int id) {

        this.id = id;
    }

    public void setUsername(String username) {

        this.username = username;
    }

    public void setMessage(String message) {

        this.message = message;
    }
}