package com.example;

import org.ansj.splitWord.analysis.IndexAnalysis;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;
import java.util.stream.Stream;

//@SpringBootTest
class SpringBootEchartsApplicationTests {

    @Test
    void contextLoads() {
        String text = "?4月16日0-24时，全省无新增境外输入确诊病例。新增治愈出院1例（梅河口市）。截至4月16日24时，全省累计报告境外输入确诊病例9例，累计治愈出院5例（延边州2例，长春市1例，吉林市1例，梅河口市1例），在院隔离治疗4例（吉林市3例，长春市1例）。上述境外输入确诊病例的密切接触者121人，已解除医学观察46人，正在指定地点进行隔离医学观察75人。";
        String all = text.replaceAll("[^a-zA-Z\\d\\u4e00-\\u9fa5]", "");
//        System.out.println(all);
        String string = IndexAnalysis.parse(all).toStringWithOutNature();
        String[] split = string.split(",");
        System.out.println(Arrays.toString(split));
        Map<String, Integer> map = new HashMap<>();
        for (String str : split) {
            Integer num = map.get(str);
            map.put(str, num == null ? 1 : num + 1);
        }
        Set<Map.Entry<String, Integer>> set = map.entrySet();
        Stream<Map.Entry<String, Integer>> sorted = set.stream().sorted((a,b)-> b.getValue().compareTo(a.getValue()));
        Iterator<Map.Entry<String, Integer>> iterator = sorted.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
    @Test
    public void testString(){
        String name = "张三市";
        name.replaceAll("市","");
        System.out.println(name);
    }

}
