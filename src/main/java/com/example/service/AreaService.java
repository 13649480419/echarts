package com.example.service;

import com.example.pojo.AreaCount;
import com.example.pojo.Covid;

import java.util.List;
import java.util.Map;

public interface AreaService {
    Map<String, List<Integer>> getArea();

    List<AreaCount> getAllConfirmed();

    Map<String, List<Float>> getAreaChain();

    List<List > getMigrate();
}
