package com.example.service.impl;

import com.example.mapper.AreaMapper;
import com.example.pojo.AreaChain;
import com.example.pojo.AreaCount;
import com.example.pojo.Migrate;
import com.example.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class  AreaServiceImpl implements AreaService {
    @Autowired
    private AreaMapper areaMapper;

    @Override
    public Map<String, List<Integer>> getArea() {
        areaMapper.getArea();
        return null;
    }

    @Override
    public List<AreaCount> getAllConfirmed() {
        List<AreaCount> list = areaMapper.getAllConfirmed();
        for (int i = 0; i < list.size(); i++) {
            String getName = list.get(i).getName();
            String name = getName.replaceAll("(?:省|市|壮族自治区|回族自治区|维吾尔自治区|自治区)","");
            list.get(i).setName(name);
        }
        return list;
    }

    @Override
    public Map<String, List<Float>> getAreaChain() {
        List<AreaChain> lists = areaMapper.getAreaChain();
        Map<String,List<Float>> map = new HashMap<>();
        for (int i = 0; i < lists.size(); i++) {
            String name = lists.get(i).getName();
            Float longitude = lists.get(i).getLongitude();
            Float latitude = lists.get(i).getLatitude();
            List<Float> list = new ArrayList<>();
            list.add(longitude);
            list.add(latitude);
            map.put(name,list);
        }
        return map;
    }

    @Override
    public List<List> getMigrate() {
        List<Migrate> lists = areaMapper.getMigrate();
        List listMap = new ArrayList<>();
        Map<String,String> map = new HashMap<>();
        map.put("name","湖北省");
        List<List> list = new ArrayList<>();
        for (int i = 0; i < lists.size(); i++) {
            listMap.add(map);
            listMap.add(lists.get(i));
            list.add(listMap);
            listMap = new ArrayList<>();
        }
        return list;
    }
}
