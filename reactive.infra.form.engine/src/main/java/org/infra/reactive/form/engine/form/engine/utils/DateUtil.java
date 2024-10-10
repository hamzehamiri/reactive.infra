package org.infra.reactive.form.engine.form.engine.utils;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DateUtil {
    public static class DateBetween {
        private Date fromDate;
        private Date toDate;

        public Date getFromDate() {
            return fromDate;
        }

        public void setFromDate(Date fromDate) {
            this.fromDate = fromDate;
        }

        public Date getToDate() {
            return toDate;
        }

        public void setToDate(Date toDate) {
            this.toDate = toDate;
        }
    }

    public static List<DateBetween> segment(Date from, Date to, long segmentDate) {
        long segmentSpace = (to.getTime() - from.getTime()) / segmentDate;

        List<DateBetween> dateBetweenList = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE , 1);
        calendar.get(Calendar.HOUR_OF_DAY);

        long beforeDate = from.getTime();
        for (long segmentIndex = 1; segmentIndex <= segmentSpace; segmentIndex += 1) {
            DateBetween dateBetween = new DateBetween();
            dateBetween.setFromDate(new Date(beforeDate));

            beforeDate = beforeDate + segmentDate;

            dateBetween.setToDate(new Date(beforeDate));

            dateBetweenList.add(dateBetween);
        }

        return dateBetweenList;
    }

    public static void main(String[] args) {
        Date dateFrom = new Date();
        Date toFrom = new Date(dateFrom.getTime() + (2 * 60 * 60 * 1000));
        DateUtil.segment(dateFrom, toFrom, 10 * 60 * 1000);
    }
}
