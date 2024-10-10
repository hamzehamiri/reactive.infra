package org.infra.reactive.form.engine.calendar;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.infra.reactive.form.engine.calendar.dto.TimeIrNewRequestAPIDTO;
import org.infra.reactive.form.engine.calendar.dto.time.TimeIrNewAPIDTO;
import org.infra.reactive.form.engine.calendar.dto.time.TimeIrNewDataDateDTO;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDate;

public class DateConverter {
    /**
     * Gregorian & Jalali (Hijri_Shamsi,Solar) Date Converter Functions
     * Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
     * License: GNU/LGPL _ Open Source & Free :: Version: 2.80 : [2020=1399]
     * ---------------------------------------------------------------------
     * 355746=361590-5844 & 361590=(30*33*365)+(30*8) & 5844=(16*365)+(16/4)
     * 355666=355746-79-1 & 355668=355746-79+1 &  1595=605+990 &  605=621-16
     * 990=30*33 & 12053=(365*33)+(32/4) & 36524=(365*100)+(100/4)-(100/100)
     * 1461=(365*4)+(4/4) & 146097=(365*400)+(400/4)-(400/100)+(400/400)
     */

    public static int[] gregorian_to_jalali(int gy, int gm, int gd) {
        int[] out = {(gm > 2) ? (gy + 1) : gy, 0, 0};
        {
            int[] g_d_m = {0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334};
            out[2] = 355666 + (365 * gy) + ((int) ((out[0] + 3) / 4)) - ((int) ((out[0] + 99) / 100)) + ((int) ((out[0] + 399) / 400)) + gd + g_d_m[gm - 1];
        }
        out[0] = -1595 + (33 * ((int) (out[2] / 12053)));
        out[2] %= 12053;
        out[0] += 4 * ((int) (out[2] / 1461));
        out[2] %= 1461;
        if (out[2] > 365) {
            out[0] += (int) ((out[2] - 1) / 365);
            out[2] = (out[2] - 1) % 365;
        }
        if (out[2] < 186) {
            out[1] = 1 + (int) (out[2] / 31);
            out[2] = 1 + (out[2] % 31);
        } else {
            out[1] = 7 + (int) ((out[2] - 186) / 30);
            out[2] = 1 + ((out[2] - 186) % 30);
        }
        return out;
    }

    public static int[] jalali_to_gregorian(int jy, int jm, int jd) {
        jy += 1595;
        int[] out = {0, 0, -355668 + (365 * jy) + (((int) (jy / 33)) * 8) + ((int) (((jy % 33) + 3) / 4)) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186)};
        out[0] = 400 * ((int) (out[2] / 146097));
        out[2] %= 146097;
        if (out[2] > 36524) {
            out[0] += 100 * ((int) (--out[2] / 36524));
            out[2] %= 36524;
            if (out[2] >= 365) out[2]++;
        }
        out[0] += 4 * ((int) (out[2] / 1461));
        out[2] %= 1461;
        if (out[2] > 365) {
            out[0] += (int) ((out[2] - 1) / 365);
            out[2] = (out[2] - 1) % 365;
        }
        int[] sal_a = {0, 31, ((out[0] % 4 == 0 && out[0] % 100 != 0) || (out[0] % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        for (out[2]++; out[1] < 13 && out[2] > sal_a[out[1]]; out[1]++) out[2] -= sal_a[out[1]];
        return out;
    }

    public static void main(String[] args) {
        try {
            HttpClient client = HttpClient.newBuilder()
                    .version(HttpClient.Version.HTTP_1_1)
                    .followRedirects(HttpClient.Redirect.NORMAL)
                    .connectTimeout(Duration.ofSeconds(20))
//                    .proxy(ProxySelector.of(new InetSocketAddress("https://api.time.ir/v1/time/fa/time/convertdate", 80)))
//                    .authenticator(Authenticator.getDefault())
                    .build();

            LocalDate oldDate = LocalDate.parse("2000-01-01");

            for (int i = 1; i < 100000; i++) {
                LocalDate date = oldDate.plusDays(i);
                int[] indexDate = DateConverter.gregorian_to_jalali(date.getYear(), date.getMonthValue(), date.getDayOfMonth());

                TimeIrNewRequestAPIDTO timeIrNewRequestAPIDTO = new TimeIrNewRequestAPIDTO(1, date.getYear(), date.getMonthValue(), date.getDayOfMonth());
                ObjectMapper objectMapper = new ObjectMapper();
                String stringJson = objectMapper.writeValueAsString(timeIrNewRequestAPIDTO);

                HttpRequest request = HttpRequest.newBuilder()
                        .header("X-Api-Key", "ZAVdqwuySASubByCed5KYuYMzb9uB2f7")
                        .headers("Content-Type", "application/json")
                        .uri(new URI("https://api.time.ir/v1/time/fa/time/convertdate"))
                        .POST(HttpRequest.BodyPublishers.ofString(stringJson))
                        .build();


                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                TimeIrNewAPIDTO dd = objectMapper.readValue(response.body(), TimeIrNewAPIDTO.class);
                if (dd.getData().getDate_list() != null && !dd.getData().getDate_list().isEmpty()) {
                    TimeIrNewDataDateDTO convertDate = dd.getData().getDate_list().getFirst();
                    if (indexDate[0] == convertDate.getYear() && indexDate[1] == convertDate.getMonth() && indexDate[2] == convertDate.getDay()) {

                    } else {
                        System.out.println("NotValid : => " + convertDate.getYear() + " : " + convertDate.getMonth() + " : " + convertDate.getDay());
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
