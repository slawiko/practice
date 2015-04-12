import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.TreeMap;

public class Client implements Runnable {

    private List<Message> history = new ArrayList<Message>();
    private MessageExchange messageExchange = new MessageExchange();
    private String host;
    private Integer port;
    private String currentUser;

    public Client(String host, Integer port, String currentUser) {
        this.host = host;
        this.port = port;
        this.currentUser = currentUser;
    }

    public static void main(String[] args) {
        if (args.length != 2) {
            System.out.println("Usage: java ChatClient host port");
        }
        else {
            System.out.println("Connection to server...");
            String serverHost = args[0];
            Integer serverPort = Integer.parseInt(args[1]);
            System.out.print("Enter username: ");
            Scanner scanner = new Scanner(System.in);
            String currentUser = scanner.nextLine();
            Client client = new Client(serverHost, serverPort, currentUser);
            new Thread(client).start();
            System.out.println("Connected to server " + serverHost + ":" + serverPort + " with username \"" + currentUser + "\"");
            client.listen();
        }
    }

    private HttpURLConnection getHttpURLConnection() throws IOException {
        URL url = new URL("http://" + host + ":" + port + "/chat?token=" + messageExchange.getToken(history.size()));
        return (HttpURLConnection) url.openConnection();
    }

    public ArrayList<Message> getMessages() {
        ArrayList<Message> list = new ArrayList<Message>();
        HttpURLConnection connection = null;

        try {
            connection = getHttpURLConnection();
            connection.connect();
            String response = messageExchange.inputStreamToString(connection.getInputStream());
            JSONObject jsonObject = messageExchange.getJSONObject(response);

            JSONArray jsonArray = (JSONArray)jsonObject.get("messages");

            for (Object o : jsonArray) {
                Message message = JSONObjectToMessage((JSONObject)o);
                if (!currentUser.equals(message.getUsername())) {
                    System.out.println(message.getUsername() + ": " + message.getMessage());
                }
                list.add(message);
            }
        } catch (IOException e) {
            System.err.println("ERROR1: " + e.getMessage());
        } catch (ParseException e) {
            System.err.println("ERROR2: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
        return list;
    }

    public void sendMessage(String message) {
        if (!"".equals(message)) {
            HttpURLConnection connection = null;
            try {
                connection = getHttpURLConnection();
                connection.setDoOutput(true);

                connection.setRequestMethod("POST");

                DataOutputStream wr = new DataOutputStream(connection.getOutputStream());

                byte[] bytes = messageExchange.getClientSendMessageRequest(currentUser, message).getBytes();
                wr.write(bytes, 0, bytes.length);
                wr.flush();
                wr.close();

                connection.getInputStream();
            } catch (IOException e) {
                System.err.println("ERROR3: " + e.getMessage());
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        }
    }

    public void listen() {
        while (true) {
            ArrayList<Message> list = getMessages();

            if (list.size() > 0) {
                history.addAll(list);
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.err.println("ERROR4: " + e.getMessage());
            }
        }
    }

    private Message JSONObjectToMessage(JSONObject o) {
        Message message = new Message();

        message.setId((o.get("id").toString()));
        message.setUsername(o.get("username").toString());
        message.setMessage(o.get("message").toString());

        return message;
    }

    @Override
    public void run() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            String message = scanner.nextLine();
            sendMessage(message);
        }
    }
}