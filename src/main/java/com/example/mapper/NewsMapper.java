package com.example.mapper;

import com.example.pojo.NewsInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface NewsMapper {
    @Select("select count(1) newsCount,news_source from news_info group by news_source;")
    List<NewsInfo> getNewsCount();

    @Select("select publish_time,count(1) newsCount,news_source from " +
            "(select news_source,left(publish_time,instr(publish_time,\" \")-1) " +
            "publish_time from news_info) n group by news_source,publish_time " +
            "HAVING publish_time BETWEEN '2020-02-01' AND '2020-02-29' " +
            "order by COUNT(1) DESC;")
    List<NewsInfo> getDayCount();

    @Select("select news_summary from news_info")
    List<String> getCount();
}
