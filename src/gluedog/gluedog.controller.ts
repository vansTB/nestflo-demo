import { Controller, Post, Body, Res, Get } from "@nestjs/common";
import { Response } from "express";
import { GluedogService } from "./gluedog.service";
@Controller("gluedog")
export class GuledogController {
  constructor(private readonly glueDogService: GluedogService) {}

  @Get("/")
  async handleHello() {
    return "hello glueDog";
  }

  // @Get("getGuleDogInfo")
  // handleGetGlueDogInfo(@Query() params, @Res() res: Response) {
  //   if (params.appId && !params.authorizationToken) {
  //     this.cacheManager.set("guleDog:appId", params.appId);
  //     return res.redirect(
  //       `http://localhost:3000/oauth/authorize?appId=${params.appId}&supplierId=6666c8e05705876aee9e5318`
  //     );
  //   }
  //   if (params.authorizationToken && params.appId) {
  //     this.cacheManager.set(
  //       "guleDog:authorizationToken",
  //       params.authorizationToken
  //     );
  //     return await this.httpService
  //       .post("http://localhost:3002/oauth/token", {
  //         supplierId: "6666c8e05705876aee9e5318",
  //         supplierSecret: "3ea00b0d-7bf5-415c-b21d-f3dfe9deb109",
  //         appId: "6732ed0623c18fe76695bf05",
  //         authorizationToken:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY3MzJlZDA2MjNjMThmZTc2Njk1YmYwNSIsImlhdCI6MTczMTM5MDc4NCwiZXhwIjoxNzMzODA5OTg0fQ.aeeNE9RU1P03WYecl4DOb5EgbFWd_yM-0Jd4xg_Cxrc",
  //       })
  //       .pipe(
  //         map((response: any) => {
  //           response.data;
  //         })
  //       );
  //   }
  // }

  @Post("me/branches/updated")
  handleGlueDog(@Body() body) {
    console.dir("body", body);
    console.dir(body);
    return {
      status: "CONNECTED",
    };
  }
}
