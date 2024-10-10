package org.infra.reactive.web.webdavnew.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;
import java.util.TimeZone;

public class DateTime {

    final static TimeZone DEFAULT_TIME_ZONE = TimeZone.getTimeZone("GMT");

    private DateTime() {
    }

    public static String formatDate(Date date, String format) {
        return DateTime.formatDate(DEFAULT_TIME_ZONE, date, format);
    }

    public static String formatDate(TimeZone timeZone, Date date, String format) {
        SimpleDateFormat pattern = new SimpleDateFormat(format, Locale.US);
        pattern.setTimeZone(Objects.nonNull(timeZone) ? timeZone : DEFAULT_TIME_ZONE);
        return pattern.format(date);
    }
}