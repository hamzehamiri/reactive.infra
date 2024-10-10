package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join;

public enum JoinTypeEnum {
    InnerJoin("inner join"),
    LeftJoin("left join"),
    RightJoin("right join"),
    Join("join");

    private String jointType;

    JoinTypeEnum(String jointType) {
        this.jointType = jointType;
    }

    @Override
    public String toString() {
        return this.jointType;
    }
}
