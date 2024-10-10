package org.infra.reactive.form.engine.xml;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBElement;
import jakarta.xml.bind.Marshaller;
import jakarta.xml.bind.Unmarshaller;

import javax.xml.transform.stream.StreamSource;
import java.io.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class JaxBXmlService {

    private static final ConcurrentMap<String, Unmarshaller> unmarshallerCache = new ConcurrentHashMap<>(1000);

    public static <T> T getValue(Class<T> clazz, String instance) {
        if (instance != null) {
            StringReader reader = new StringReader(instance);
            try {
                Unmarshaller unMa = unmarshallerCache.get(clazz.getName());
                if (unMa == null) {
                    synchronized (JaxBXmlService.class) {
                        unMa = unmarshallerCache.get(clazz.getName());
                        if (unMa == null) {
                            JAXBContext context = JAXBContext.newInstance(clazz);
                            unMa = context.createUnmarshaller();
                            unmarshallerCache.put(clazz.getName(), unMa);
                        }
                    }
                }

                JAXBElement<T> jaxbElement = unMa.unmarshal(new StreamSource(reader), clazz);
                return jaxbElement.getValue();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            return null;
        }
        return null;
    }

    public static <T> String getXmlString(Class<T> clazz, T instance) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(clazz);

            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            StringWriter sw = new StringWriter();
            jaxbMarshaller.marshal(instance, sw);

            return sw.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getStringFromInputStream(InputStream is) {
        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();

        String line;
        try {
            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return sb.toString();
    }
}
