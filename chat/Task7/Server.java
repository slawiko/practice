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

    private TreeMap<Integer, Message> history = new TreeMap<Integer, Message>();
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
                //System.out.println("Edit message: \nPUT http://" + serverHost + ":" + port + "/chat provided body json in format {\"id\" : \"id\", \"message\" : \"message\"} \n");

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

        if ("GET".equals(httpExchange.getRequestMethod())) {
            response = doGet(httpExchange);
        }
        else if ("POST".equals(httpExchange.getRequestMethod())) {
            doPost(httpExchange);
        }
        else if ("DELETE".equals(httpExchange.getRequestMethod())) {
            doDelete(httpExchange);
        }
        else if ("PUT".equals(httpExchange.getRequestMethod())) {
            //doPut(httpExchange);
        }
        else {
            response = "Unsupported http method: " + httpExchange.getRequestMethod();
        }
        sendResponse(httpExchange, response);
    }

    private String doGet(HttpExchange httpExchange) {
        String query = httpExchange.getRequestURI().getQuery();
        if (query != null) {
            Map<String, String> map = queryToMap(query);
            String token = map.get("token");

            if (token != null && !"".equals(token)) {
                int index = messageExchange.getIndex(token);
                return messageExchange.getServerResponse(new TreeMap<Integer, Message>(history.subMap(index, history.size())));
            }
            else {
                return "Token query parameter is absent in url: " + query;
            }
        }
        return  "Absent query in url";
    }

    private void doPost(HttpExchange httpExchange) {
        try {
            Message message = messageExchange.getClientMessage(httpExchange.getRequestBody());
            message.setId(history.size());
            System.out.println("Get Message from " + message.getUsername() + ": " + message.getMessage());
            history.put(message.getId(), message);
        } catch (ParseException e) {
            System.err.println("Invalid user message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    private void doDelete(HttpExchange httpExchange) {
        try {
            Message deleteId = messageExchange.getClientMessageId(httpExchange.getRequestBody());
            Message newMessage = new Message(deleteId.getId(), "Deleted", "Deleted");
            Message oldMessage = new Message(history.get(deleteId.getId()));
            history.replace(deleteId.getId(), newMessage);
            System.out.println("Message \"" + oldMessage.getMessage() + "\" of user \"" + oldMessage.getUsername() + "\" was deleted.");
        } catch (ParseException e) {
            System.err.println("Invalid id message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }

    /*private void doPut(HttpExchange httpExchange) {
        try {
            Message oldMessage = messageExchange.getClientMessage(httpExchange.getRequestBody());
        } catch (ParseException e){
            System.err.println("Invalid id message: " + httpExchange.getRequestBody() + " " + e.getMessage());
        }
    }*/

    private void sendResponse(HttpExchange httpExchange, String response) {
        try {
            byte[] bytes = response.getBytes();
            Headers headers = httpExchange.getResponseHeaders();
            headers.add("Access-Control-Allow-Origin","*");
            httpExchange.sendResponseHeaders(200, bytes.length);
            OutputStream os = httpExchange.getResponseBody();
            os.write(bytes);
            os.flush();
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
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
