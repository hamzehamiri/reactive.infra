package org.infra.reactive.form.engine.query.xmlreader;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class XMLReader {
    private StringBuilder currentElement = new StringBuilder();
    private Map<String, String> currentAttributes = new HashMap<>();
    private String[] elementStack = new String[100];
    private int top = -1;

    public void read(String fileName) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                processLine(line);
            }
        }
    }

    private void processLine(String line) {
        if (line.startsWith("<")) {
            int endTagIndex = line.indexOf("</");
            if (endTagIndex == -1) {
                processStartTag(line.substring(1));
            } else {
                processEndTag(line.substring(endTagIndex + 2));
            }
        } else if (!line.trim().isEmpty()) {
            processTextNode(line);
        }
    }

    private void processStartTag(String tagName) {
        currentElement.append(tagName).append(">");
        elementStack[++top] = tagName;
        // Reset attributes for the new element
        currentAttributes.clear();
    }

    private void processEndTag(String tagName) {
        if (tagName.equals("/" + elementStack[top--])) {
            currentElement.delete(currentElement.length() - tagName.length() - 2, currentElement.length());
        } else {
            throw new RuntimeException("Mismatched tag: " + tagName);
        }
    }

    private void processTextNode(String text) {
        currentElement.append(text);
    }

    public String getCurrentElement() {
        return currentElement.toString();
    }

    public Map<String, String> getCurrentAttributes() {
        return currentAttributes;
    }
}
