import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.util.*;

public class Server implements HttpHandler {

    private ArrayList<Message> history = new ArrayList<Message>();
    private MessageExchange messageExchange = new MessageExchange();

    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: java Server port");
        }
        else {
            try {
                System.out.println("Server is starting...");
                Integer port = Integer.parseInt(args[0]);
                HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
                System.out.println("Server started.\n");
                String serverHost = InetAddress.getLocalHost().getHostAddress();
                System.out.println("Get list of messages: \nGET http://" + serverHost + ":" + port + "/chat?token={token} \n");
                System.out.println("Send message: \nPOST http://" + serverHost + ":" + port + "/chat provide body json in format {\"username\" : \"username\", \"message\" : \"message\"} \n");
                System.out.println("Delete message: \nDELETE http://" + serverHost + ":" + port + "/chat provided body json in format {\"id\" : \"id\"} \n");
                System.out.println("Edit message: \nPUT http://" + serverHost + ":" + port + "/chat provided body json in format {\"id\" : \"id\", \"message\" : \"message\"} \n");

                server.createContext("/chat", new Server());
                server.setExecutor(null);
                server.start();
            } catch (IOException e) {
                System.out.println("Error creating http server: " + e);
            }
        }
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        String response = "";

        try {
            if ("GET".equals(httpExchange.getRequestMethod())) {
                response = doGet(httpExchange);
            } else if ("POST".equals(httpExchange.getRequestMethod())) {
                doPost(httpExchange);
            } else if ("DELETE".equals(httpExchange.getRequestMethod())) {
                doDelete(httpExchange);
            } else if ("PUT".equals(httpExchange.getRequestMethod())) {
                doPut(httpExchange);
            } else if ("OPTIONS".equals(httpExchange.getRequestMethod())) {

            } else {
                throw new Exception("Unsupported http method: " + httpExchange.getRequestMethod());
            }
        } catch (Exception e){
            response = messageExchange.getErrorMessage(e.getMessage());
            e.printStackTrace();
        }

        try {
            sendResponse(httpExchange, response);
        } catch (Exception e) {
            System.out.println("Unable to send response!");
        }
    }

    private String doGet(HttpExchange httpExchange) throws Exception{
        String query = httpExchange.getRequestURI().getQuery();
        if (query != null) {
            Map<String, String> map = queryToMap(query);
            String token = map.get("token");
            //System.out.println("Token " + token);

            if (token != null && !"".equals(token)) {
                int index = messageExchange.getIndex(token);
                //System.out.println("Index " + index);
                return messageExchange.getServerResponse(new ArrayList<Message>(history.subList(index, history.size())), history.size());
            }
            throw new Exception("Token query parameter is absent in url: " + query);
        }
        throw new Exception("Absent query in url");
    }

    private void doPost(HttpExchange httpExchange) throws Exception{
        try {
            Message message = messageExchange.getClientMessage(httpExchange.getRequestBody(), "POST");
            System.out.println("Get Message with ID {" + message.getId() + "} from " + message.getUsername() + ": " + message.getTextMessage());
            history.add(message);
        } catch (ParseException e) {
            System.err.println("Invalid user message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    private void doDelete(HttpExchange httpExchange) throws Exception{
        try {
            String deletedMessageId = messageExchange.getClientMessage(httpExchange.getRequestBody(), "DELETE").getId();
            for (int i = 0; i < history.size(); i++) {
                if (history.get(i).getId().equals(deletedMessageId)) {
                    Message deletedMessage = new Message("[DELETED]", "[DELETED]", "[DELETED]");
                    System.out.println("Message \"" + history.get(i).getTextMessage() + "\" of user \"" + history.get(i).getUsername() + "\" was deleted.");
                    history.remove(i);
                    history.add(i, deletedMessage);
                    return;
                }
            }
        } catch (ParseException e) {
            System.err.println("Invalid id message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    private void doPut(HttpExchange httpExchange) {
        try {
            Message newMessage = messageExchange.getClientMessage(httpExchange.getRequestBody(), "PUT");
            for (int i = 0; i < history.size(); i++) {
                if (history.get(i).getId().equals(newMessage.getId())) {
                    newMessage.setUsername(history.get(i).getUsername());
                    System.out.println("Message \"" + history.get(i).getTextMessage() + "\" of user \"" + history.get(i).getUsername() + "\" was replaced by message \"" + newMessage.getTextMessage() + "\".");
                    history.remove(i);
                    history.add(i, newMessage);
                }
            }
        } catch (ParseException e){
            System.err.println("Invalid message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    private void sendResponse(HttpExchange httpExchange, String response) {
        try {
            byte[] bytes = response.getBytes();
            Headers headers = httpExchange.getResponseHeaders();
            headers.add("Access-Control-Allow-Origin","*");
            if("OPTIONS".equals(httpExchange.getRequestMethod())) {
                headers.add("Access-Control-Allow-Methods","PUT, DELETE, POST, GET, OPTIONS");
            }
            httpExchange.sendResponseHeaders(200, bytes.length);
            writeBody(httpExchange, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
}

    private void writeBody(HttpExchange httpExchange, byte[] bytes) throws IOException {
        OutputStream os = httpExchange.getResponseBody();

        os.write( bytes);
        os.flush();
        os.close();
    }

    private Map<String, String> queryToMap(String query) {
        Map<String, String> result = new HashMap<String, String>();

        for (String param : query.split("&")) {
            String pair[] = param.split("=");
            if (pair.length > 1) {
                result.put(pair[0], pair[1]);
            } else {
                result.put(pair[0], "");
            }
        }
        return result;
    }
}