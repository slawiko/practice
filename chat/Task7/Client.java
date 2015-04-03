import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Scanner;
import java.util.TreeMap;

public class Client implements Runnable {

    private TreeMap<Integer, Message> history = new TreeMap<Integer, Message>();
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

    public TreeMap<Integer, Message> getMessages() {
        TreeMap<Integer, Message> map = new TreeMap<Integer, Message>();
        HttpURLConnection connection = null;

        try {
            connection = getHttpURLConnection();
            connection.connect();
            String response = messageExchange.inputStreamToString(connection.getInputStream());
            JSONObject jsonObject = messageExchange.getJSONObject(response);

            JSONArray jsonArray = (JSONArray) jsonObject.get("messages");

            for (Object o : jsonArray) {
                Message message = JSONObjectToMessage((JSONObject)o);
                if (currentUser.equals(message.getUsername())) {
                    System.out.println(message.getUsername() + ": " + message.getMessage());
                }
                map.put(message.getId(), message);
            }
        } catch (IOException e) {
            System.err.println("ERROR: " + e.getMessage());
        } catch (ParseException e) {
            System.err.println("ERROR: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }

        return map;
    }

    public void sendMessage(String message) {
        HttpURLConnection connection = null;
        try {
            connection = getHttpURLConnection();
            connection.setDoOutput(true);

            connection.setRequestMethod("POST");

            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());

            byte[] bytes = messageExchange.getClientSendMessageRequest(message).getBytes();
            wr.write(bytes, 0, bytes.length);
            wr.flush();
            wr.close();

            connection.getInputStream();
        } catch (IOException e) {
            System.err.println("ERROR: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    public void listen() {
        while (true) {
            TreeMap<Integer, Message> map = getMessages();

            if (map.size() > 0) {
                history.putAll(map);
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.err.println("ERROR: " + e.getMessage());
            }
        }
    }

    private Message JSONObjectToMessage(JSONObject o) {
        Message message = new Message();

        message.setId(Integer.parseInt(o.get("id").toString()));
        message.setUsername(o.get("username").toString());
        message.setMessage(o.get("messages").toString());

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