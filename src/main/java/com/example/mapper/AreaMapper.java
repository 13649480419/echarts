package com.example.mapper;

import com.example.pojo.AreaChain;
import com.example.pojo.AreaCount;
import com.example.pojo.Migrate;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AreaMapper {


    void getArea();

    @Select("SELECT province_name name,SUM(confirmed_count) value " +
            "FROM covid_data WHERE update_time='2020-02-29' " +
            "GROUP BY province_name;")
    List<AreaCount> getAllConfirmed();

    @Select("SELECT `name`,longitude,latitude FROM area_china WHERE parentCode=0;")
    List<AreaChain> getAreaChain();

    @Select("SELECT target_province_name name,`value` " +
            "FROM migrate_data WHERE source_province_name='湖北省';")
    List<Migrate> getMigrate();
}
