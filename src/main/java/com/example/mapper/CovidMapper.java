package com.example.mapper;
import com.example.pojo.ConfirmedValue;
import com.example.pojo.Covid;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CovidMapper {

    @Select("select round(sum(dead_count) / sum(confirmed_count) * 100,2) " +
            "from covid_data where update_time='2020-02-29';")
    Double getDead();

    @Select("SELECT SUM(confirmed_add) addCount,update_time FROM covid_data " +
            "GROUP BY update_time HAVING SUM(confirmed_add)<4000;")
    List<Covid> getAdd();

    @Select("SELECT m.`value` sumValue,SUM(c.confirmed_count) sumConfirmed FROM covid_data c " +
            "JOIN (SELECT ROUND(SUM(`value`),2) `value`,target_province_code " +
            "FROM migrate_data WHERE source_province_name='湖北省' " +
            "GROUP BY target_province_code) m ON c.province_code=m.target_province_code " +
            "WHERE c.update_time='2020-02-29' GROUP BY c.province_code;")
    List<ConfirmedValue> getCount();
}
