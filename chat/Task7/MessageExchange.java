import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.Map;
import java.util.TreeMap;

public class MessageExchange {

    private JSONParser jsonParser = new JSONParser();

    public String getToken(int index) {
        Integer number = index * 8 + 11;
        return "TN" + number + "EN";
    }

    public JSONArray mapToJSONArray(TreeMap<Integer, Message> messages) {
        JSONArray jsonArray = new JSONArray();
        for (Map.Entry o : messages.entrySet()) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", ((Message)o.getValue()).getId());
            jsonObject.put("username", ((Message)o.getValue()).getUsername());
            jsonObject.put("message", ((Message)o.getValue()).getMessage());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    public int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public String getServerResponse(TreeMap<Integer, Message> messages) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("messages", mapToJSONArray(messages));
        jsonObject.put("token", getToken(messages.size()));
        return jsonObject.toJSONString();
    }

    public String getClientSendMessageRequest(String message, String username) {
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        jsonArray.add(message);
        jsonObject.put("username", username);
        jsonObject.put("message", message);
        return jsonObject.toJSONString();
    }

    public Message getClientMessage(InputStream inputStream) throws ParseException {
        JSONObject jsonObject = getJSONObject(inputStreamToString(inputStream));
        Message message = new Message(jsonObject.get("username").toString(), jsonObject.get("message").toString());
        return message;
    }

    public Message getClientMessageId(InputStream inputStream) throws ParseException {
        JSONObject jsonObject = getJSONObject(inputStreamToString(inputStream));
        Message message = new Message(Integer.parseInt(jsonObject.get("id").toString()));
        return message;
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public String inputStreamToString(InputStream in) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length = 0;

        try {
            while ((length = in.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new String(baos.toByteArray());
    }
}