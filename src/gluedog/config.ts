export const getGluedogConfig = () => {
  if (process.env.NODE_ENV !== "production") {
    return {
      // 与gluedog公司协商的
      supplierId: "6666c8e05705876aee9e5318",
      supplierSecret: "3ea00b0d-7bf5-415c-b21d-f3dfe9deb109",
      connectRedirect: "http://localhost:815/gluedog/getGluedogInfo",
      authorizeRedirect: "http://localhost:815/gluedog/getGluedogInfo",
      webhookEndpoint: "http://host.docker.internal:815/work",
      webhookSecret: "nestai",
      beginConnectRedirect: "http://localhost:3000/oauth/connect",
      getOuathAppRedirect: "http://localhost:3000/oauth/authorize",
      getTokenUrl: "http://localhost:3002/oauth/token",
      toFinishConnectRedirect: "http://localhost:3000/oauth/authorized",
      pushGuestURL: "http://localhost:3002/leads",
    };
  } else {
    // 测试环境、生产环境
  }
};
