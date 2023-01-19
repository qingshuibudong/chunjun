/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.dtstack.chunjun.util;

import com.dtstack.chunjun.constants.ConstantValue;

import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

public class JobUtil {

    private JobUtil() throws IllegalAccessException {
        throw new IllegalAccessException(getClass().getName() + " can not be instantiated");
    }

    public static String replaceJobParameter(String p, String job) {
        if (StringUtils.isNotBlank(p)) {
            Map<String, String> parameters = CommandTransform(p);
            job = JsonValueReplace(job, parameters);
        }
        return job;
    }

    public static String JsonValueReplace(String json, Map<String, String> parameter) {
        for (String item : parameter.keySet()) {
            if (json.contains("${" + item + "}")) {
                json = json.replace("${" + item + "}", parameter.get(item));
            }
        }
        return json;
    }

    /** 将命令行中的修改命令转化为HashMap保存 */
    public static HashMap<String, String> CommandTransform(String command) {
        HashMap<String, String> parameter = new HashMap<>();
        if (StringUtils.isBlank(command)) {
            return parameter;
        }

        String[] split = command.split(ConstantValue.DOUBLE_COMMA_SYMBOL);
        for (String item : split) {
            String[] temp = item.split(ConstantValue.EQUAL_SYMBOL);
            parameter.put(temp[0].trim(), temp[1].trim());
        }
        return parameter;
    }
}
