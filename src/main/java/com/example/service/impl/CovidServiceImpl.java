package com.example.service.impl;

import com.example.mapper.CovidMapper;
import com.example.pojo.ConfirmedValue;
import com.example.pojo.Covid;
import com.example.service.CovidService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class CovidServiceImpl implements CovidService {
    @Autowired
    private CovidMapper covidMapper;

    @Override
    public Double getDead() {
        Double dead = covidMapper.getDead();
        return dead;
    }

    @Override
    public List<Covid> getAdd() {
        List<Covid> list = covidMapper.getAdd();
        log.info("当前查询的信息为：{}",list);
        return list;
    }

    @Override
    public List<List<Double>> getCount() {
        List<ConfirmedValue> list = covidMapper.getCount();
        List<Double> list1 = new ArrayList<>();
        List<List<Double>> lists = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            list1.add(list.get(i).getSumValue());
            list1.add(list.get(i).getSumConfirmed());
            lists.add(list1);
            list1 = new ArrayList<>();

        }
        log.info("当前数据为：{}",lists);
        return lists;
    }
}
