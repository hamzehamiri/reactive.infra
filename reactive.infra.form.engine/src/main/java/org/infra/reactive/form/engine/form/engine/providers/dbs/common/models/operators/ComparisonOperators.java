package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators;

import lombok.Getter;

public enum ComparisonOperators {
    number_greater_than(OperatorConstant.number_greater_than, OperatorOneSqlConstant.greater_than),
    number_less_than(OperatorConstant.number_less_than, OperatorOneSqlConstant.less_than),
    number_between(OperatorConstant.number_between, OperatorOneSqlConstant.none),
    number_equal(OperatorConstant.number_equal, OperatorOneSqlConstant.equal),
    string_left_like(OperatorConstant.string_left_like, OperatorOneSqlConstant.none),
    string_right_like(OperatorConstant.string_right_like, OperatorOneSqlConstant.none),
    string_like(OperatorConstant.string_like, OperatorOneSqlConstant.none),
    string_equal(OperatorConstant.string_equal, OperatorOneSqlConstant.equal),
    date_greater_than_day(OperatorConstant.date_greater_than_day, ">"),
    date_less_than_day(OperatorConstant.date_less_than_day, ">"),
    date_equal_day(OperatorConstant.date_equal_day, ">"),
    date_between_day(OperatorConstant.date_between_day, ">"),
    date_greater_than_month(OperatorConstant.date_greater_than_month, ">"),
    date_less_than_month(OperatorConstant.date_less_than_month, ">"),
    date_equal_month(OperatorConstant.date_equal_month, ">"),
    date_between_month(OperatorConstant.date_between_month, ">"),
    date_greater_than_year(OperatorConstant.date_greater_than_year, ">"),
    date_less_than_year(OperatorConstant.date_less_than_year, ">"),
    date_equal_year(OperatorConstant.date_equal_year, ">"),
    date_between_year(OperatorConstant.date_between_year, ">"),
    date_greater_than(OperatorConstant.date_greater_than, ">"),
    date_less_than(OperatorConstant.date_less_than, ">"),
    date_equal(OperatorConstant.date_equal, ">"),
    date_between(OperatorConstant.date_between, ">"),
    single_equal(OperatorConstant.single_equal, ">"),
    single_in(OperatorConstant.single_in, ">"),
    single_not_in(OperatorConstant.single_not_in, ">");

    final String opValue;
    @Getter
    final String defaultAllSqlStandard;

    ComparisonOperators(String opValue, String defaultAllSqlStandard) {
        this.opValue = opValue;
        this.defaultAllSqlStandard = defaultAllSqlStandard;
    }

    @Override
    public String toString() {
        return opValue;
    }
}
