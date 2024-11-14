import { Controller, Post, Body, Res, Get, Query } from "@nestjs/common";
import { Response } from "express";
import { GluedogService } from "./gluedog.service";
import { HttpService } from "@nestjs/axios";
import { Cron } from "@nestjs/schedule";

@Controller("gluedog")
export class GluedogController {
  constructor(
    private readonly glueDogService: GluedogService,
    private httpService: HttpService
  ) {}

  @Get("/")
  async handleHello() {
    return "hello glueDog";
  }

  @Get("/a")
  async handleHelloa() {
    return "hello glueDog aa";
  }

  @Get("/getGluedogInfo")
  async handleGetGluedogToken(@Query() params, @Res() res: Response) {
    // return "handleGetGluedogToken";
    console.log("getGluedogInfo", params);
    return this.glueDogService.handleGetGluedogInfo(params, res);
  }

  @Post("me/branches/updated")
  handleGlueDog(@Body() body) {
    return this.glueDogService.handleGluedogFinishConnect(body);
  }
}
