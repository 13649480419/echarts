package com.example.controller;

import com.example.pojo.AreaCount;
import com.example.service.AreaService;
import com.example.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class AreaController {
    @Autowired
    private AreaService areaService;

    @GetMapping("/arear")
    public Result getArea(){
        Map<String, List<Integer>> map = areaService.getArea();
        return Result.success();
    }

    @GetMapping("/allconfirmed")
    public Result getAllConfirmed(){
        List<AreaCount> list = areaService.getAllConfirmed();
        return Result.success(list);
    }

    @GetMapping("/areachain")
    public Result getAreaChain(){
        Map<String,List<Float>> map = areaService.getAreaChain();
        return Result.success(map);
    }

    @GetMapping("/migrate")
    public Result getMigrate(){
        List<List> list = areaService.getMigrate();
        return Result.success(list);
    }
}
