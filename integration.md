1. 获取AccessToken & refreshToken
   1. 根据SupplierId获取appId(动态)
      - 页面访问：`http://localhost:3000/oauth/connect?supplierId=6666c8e05705876aee9e5318`
      - 返回带有appId的配置重定向地址：
      - `https://dev.nestflo.ai/?appId=67320ba7414b5616411587ec`
      - https://dev.nestflo.ai/?appId=6732e672467ae60c8abd7bcb
      - https://dev.nestflo.ai/?appId=6732e9f023c18fe76695bef7
   2. 获取authorizationToken
      - 页面访问：`http://localhost:3000/oauth/authorize?appId=6732ed0623c18fe76695bf05&supplierId=6666c8e05705876aee9e5318`
      - https://dev.nestflo.ai/?authorizationToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzIwZWEyNDE0YjU2MTY0MTE1ODdmYyIsImlhdCI6MTczMTMzNDAxMiwiZXhwIjoxNzMxMzM0OTEyfQ.OTvRdcEGu9pbXMU58-lXZmjga5R_ncgM0D3H94ekYvU&appId=67320ea2414b5616411587fc
      - https://dev.nestflo.ai/?authorizationToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzIwZWEyNDE0YjU2MTY0MTE1ODdmYyIsImlhdCI6MTczMTMzMzgxMywiZXhwIjoxNzMxMzM0NzEzfQ.xwdtFgcsKp_bbaA9wR6FZI7GbVU2GY4vkYBpsoVLGxA&appId=67320ba7414b5616411587ec
      - 返回带accessToken的配置重定向地址：`https://dev.nestflo.ai/?authorizationToken
      - =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzIwZWEyNDE0YjU2MTY0MTE1ODdmYyIsImlhdCI6MTczMTMzMzgxMywiZXhwIjoxNzMxMzM0NzEzfQ.xwdtFgcsKp_bbaA9wR6FZI7GbVU2GY4vkYBpsoVLGxA&appId=67320ba7414b5616411587ec`
 - https://dev.nestflo.ai/?authorizationToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzE4Yzk0MGE0ZjM5ZWMyMzU5Y2U2YSIsImlhdCI6MTczMTMwMDg4MCwiZXhwIjoxNzMxMzAxNzgwfQ.svWYRzP4sSthBoEy6sHR0_peP7uW6milpKRgDKMSUtg&appId=67320ba7414b5616411587ec
  https://dev.nestflo.ai/?authorizationToken=
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzJlNjcyNDY3YWU2MGM4YWJkN2JjYiIsImlhdCI6MTczMTM4OTA2NSwiZXhwIjoxNzMxMzg5OTY1fQ.PwFgh_p15TRigaUoREcsP0RYMMKCwNFVq6AbpYPVQgY
  &appId=6732e672467ae60c8abd7bcb 
  https://dev.nestflo.ai/?authorizationToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzJlOWYwMjNjMThmZTc2Njk1YmVmNyIsImlhdCI6MTczMTM4OTk1NSwiZXhwIjoxNzMxMzkwODU1fQ.666l-ewEzPKNrrZgN_DKaDuE8XkTbKG4i6KpRgno8n4&appId=6732e9f023c18fe76695bef7
   1. 获取accessToken
      - post请求：`http://localhost:3002/oauth/token`
       ```js
            {
                headers:{
                    x-api-version:'1.0.0'
                },
                params:{
                    supplierId:'6666c8e05705876aee9e5318',
                    supplierSecret:'3ea00b0d-7bf5-415c-b21d-f3dfe9deb109',
                    appId:'67320ea2414b5616411587fc',
                    authorizationToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzIwZWEyNDE0YjU2MTY0MTE1ODdmYyIsImlhdCI6MTczMTMzMzgxMywiZXhwIjoxNzMxMzM0NzEzfQ.xwdtFgcsKp_bbaA9wR6FZI7GbVU2GY4vkYBpsoVLGxA',
                }
            }
            https://dev.nestflo.ai/?authorizationToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzJlZDA2MjNjMThmZTc2Njk1YmYwNSIsImlhdCI6MTczMTM5MDc1MywiZXhwIjoxNzMxMzkxNjUzfQ.nAp3jnQuMQoWuENssCTWcSmQrC7WhwmzteBqY5Erz8c&appId=6732ed0623c18fe76695bf05
       ```
       - 返回token
         ```js
         {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzJlZDA2MjNjMThmZTc2Njk1YmYwNSIsImlhdCI6MTczMTM5MDc4NCwiZXhwIjoxNzMxOTk1NTg0fQ.0g59iYwz1zkPd31B-tTzKPinAxTZc-uZgA5Ef1KoGYw",
                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzJlZDA2MjNjMThmZTc2Njk1YmYwNSIsImlhdCI6MTczMTM5MDc4NCwiZXhwIjoxNzMzODA5OTg0fQ.aeeNE9RU1P03WYecl4DOb5EgbFWd_yM-0Jd4xg_Cxrc",
                "expiresIn": 604800
        }
        ```

http://localhost:3000/oauth/authorize?appId=67320ea2414b5616411587fc%20%20
http://localhost:3000/oauth/authorized?appId=6732e672467ae60c8abd7bcb

- 任务：
  1. 开发API进行第三方授权，并配合浏览器进行重定向
     <!-- 
        配置
        {
          获取appId
            baidu.com?appId  created activated
            "connectRedirect": "https://dev.nestflo.ai/",
          获取accessToken
            baidu.com?accessToken  created activated

            "authorizeRedirect": "https://dev.nestflo.ai/",
          获取branches，用于发送商机
            "webhookEndpoint": "http://host.docker.internal:814/work",
            "webhookSecret": "nestai"
        }
        重定向获取appId: http://localhost:3000/oauth/connect?supplierId=6666c8e05705876aee9e5318


      -->
  2. 将获取到的token进行数据库保存，隔一天获取一次并判断是否过期
  3. 开发推送商机的接口
     1. 将获取到的数据进行倒序，根据推送的数据进行时间断点（时间段前的不再传输）
     2. 记录断点时间、传输数据的componyId

