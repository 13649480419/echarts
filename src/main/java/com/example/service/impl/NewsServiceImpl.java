package com.example.service.impl;
import com.example.mapper.NewsMapper;
import com.example.pojo.Count;
import com.example.pojo.NewsInfo;
import com.example.service.NewsService;
import lombok.extern.slf4j.Slf4j;
import org.ansj.splitWord.analysis.IndexAnalysis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
@Slf4j
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsMapper newsMapper;

    @Override
    public List<NewsInfo> getNewsCount() {
        List<NewsInfo> list = newsMapper.getNewsCount();
//        log.info("当前查询结果为：{}",list);
        return list;
    }

    @Override
    public List<NewsInfo> getDayCount() {
        List<NewsInfo> list = newsMapper.getDayCount();
        return list;
    }

    @Override
    public List<Count> getCount() {
        List<Count> countList = new ArrayList<>();
        //控制Count类的数量
        Integer count = 0;
        Map<String, Integer> map = new HashMap<>();
        List<String>list = newsMapper.getCount();
        for (String text: list){
            String all = text.replaceAll("[^a-zA-Z\\d\\u4e00-\\u9fa5]", "");
            String string = IndexAnalysis.parse(all).toStringWithOutNature();
            String[] split = string.split(",");
            System.out.println(Arrays.toString(split));
            for (String str : split) {
                Integer num = map.get(str);
                map.put(str, num == null ? 1 : num + 1);
            }
        }
        Set<Map.Entry<String, Integer>> set = map.entrySet();
        Stream<Map.Entry<String, Integer>> sorted = set.stream().sorted(
                (a, b)-> b.getValue().compareTo(a.getValue()));
        Iterator<Map.Entry<String, Integer>> iterator = sorted.iterator();
        while (iterator.hasNext()){
            count++;
            Map.Entry<String, Integer> next = iterator.next();
            Count count1 = new Count(next.getKey(), next.getValue());
            countList.add(count1);
            if (count >= 50){
                break;
            }
        }
//        log.info("当前查询到的值为：{}",countList);
        return countList;
    }
}
