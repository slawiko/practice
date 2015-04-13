import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.awt.*;
import java.io.*;
import java.util.ArrayList;

public class MessageExchange {

    private JSONParser jsonParser = new JSONParser();

    public String getToken(int index) {
        Integer number = index * 8 + 11;
        return "TN" + number + "EN";
    }

    public int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public JSONArray listToJSONArray(ArrayList<Message> messages) {
        JSONArray jsonArray = new JSONArray();
        for(int i = 0; i < messages.size(); i++) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", messages.get(i).getId());
            jsonObject.put("username", messages.get(i).getUsername());
            jsonObject.put("textMessage", messages.get(i).getTextMessage());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    public String getServerResponse(ArrayList<Message> messages, int size) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("messages", listToJSONArray(messages));
        jsonObject.put("token", getToken(size));
        return jsonObject.toJSONString();
    }

    public String getClientSendMessageRequest(String username, String messageText) {
        JSONObject jsonObject = new JSONObject();
        Message message = new Message(username, messageText);
        jsonObject.put("id", message.getId());
        jsonObject.put("username", message.getUsername());
        jsonObject.put("textMessage", message.getTextMessage());
        return jsonObject.toJSONString();
    }

    public Message getClientMessage(InputStream inputStream, String request) throws ParseException {
        JSONObject jsonObject = getJSONObject(inputStreamToString(inputStream));
        if (request.equals("POST")) {
            return new Message(jsonObject.get("username").toString(), jsonObject.get("textMessage").toString());
        }
        else {
            return new Message(jsonObject.get("id").toString(), "", jsonObject.get("textMessage").toString());
        }
    }

    public String getClientMessageId(InputStream inputStream) throws ParseException {
        JSONObject jsonObject = getJSONObject(inputStreamToString(inputStream));
        return jsonObject.get("id").toString();
    }

    public String getErrorMessage(String text) {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("error", text);

        return jsonObject.toJSONString();
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public String inputStreamToString(InputStream in) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[2048];
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