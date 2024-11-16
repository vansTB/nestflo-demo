import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  GluedogBranches,
  GluedogInfo,
  GuestInfoSchemaDocument,
} from "./gluedog.model";
import { HttpService } from "@nestjs/axios";
import { Cron } from "@nestjs/schedule";

import { lastValueFrom } from "rxjs";
import { getGluedogConfig } from "./config";
import { response } from "express";

@Injectable()
export class GluedogService {
  constructor(
    @InjectModel(GluedogInfo.name)
    private readonly gluedogInfoEntity: Model<GluedogInfo>,
    @InjectModel("GuestInfo")
    private readonly guestInfo: Model<GuestInfoSchemaDocument>,
    @InjectModel(GluedogBranches.name)
    private readonly gluedogBrancheEntity: Model<GluedogBranches>,
    private readonly httpService: HttpService
  ) {
    // private readonly callingModel: Model<Calling>, // @InjectModel(Calling.name)
  }

  async handleGetGluedogInfo(params, res = response) {
    const glueConfig = getGluedogConfig();
    console.log(glueConfig);
    // 初次重定向，重定向至配置页面
    if (!params.appId) {
      console.log("初次重定向，重定向至配置页面");
      return res.redirect(
        `${glueConfig.beginConnectRedirect}?supplierId=${glueConfig.supplierId}`
      );
    }
    let gluedogInfoStore = await this.gluedogInfoEntity.findOne();
    console.log(gluedogInfoStore);
    // 二次重定向，带appId返回，保存并再次进入请求
    if (params.appId && !params.authorizationToken) {
      if (gluedogInfoStore) {
        gluedogInfoStore.appId = params.appId;
      } else {
        gluedogInfoStore = new this.gluedogInfoEntity();
        gluedogInfoStore.appId = params.appId;
      }
      await gluedogInfoStore.save();

      return res.redirect(
        `${glueConfig.getOuathAppRedirect}?appId=${params.appId}&supplierId=${glueConfig.supplierId}`
      );
    }
    // 三次重定向，获取authorizationToken并请求获取accessToken
    if (params.authorizationToken && params.appId) {
      if (gluedogInfoStore) {
        gluedogInfoStore.authorizationToken = params.authorizationToken;
      } else {
        gluedogInfoStore = new this.gluedogInfoEntity();
        gluedogInfoStore.appId = params.appId;
        gluedogInfoStore.authorizationToken = params.authorizationToken;
      }
      await gluedogInfoStore.save();

      // 保存token
      await this.handleStoreAccessToken(params.authorizationToken);

      return res.redirect(
        `${glueConfig.toFinishConnectRedirect}?appId=${gluedogInfoStore.appId}`
      );
    }
  }

  // 保存token、刷新token
  async handleStoreAccessToken(authorizationToken) {
    console.log("handleStoreAccessToken");
    const gluedogInfoStore = await this.gluedogInfoEntity.findOne();
    const glueConfig = getGluedogConfig();
    const re = this.httpService.post(
      glueConfig.getTokenUrl,
      {
        supplierId: glueConfig.supplierId,
        supplierSecret: glueConfig.supplierSecret,
        appId: gluedogInfoStore.appId,
        authorizationToken: authorizationToken,
      },
      {
        headers: {
          "x-api-version": "1.0.0",
        },
      }
    );

    const checkResult = await (await lastValueFrom(re)).data;
    console.log("checkResult", checkResult);
    gluedogInfoStore.accessToken = checkResult.accessToken;
    gluedogInfoStore.refreshToken = checkResult.refreshToken;
    gluedogInfoStore.expiresIn = checkResult.expiresIn;
    return await gluedogInfoStore.save();
  }

  async handleCheckGluedogToken() {
    const gluedogInfoStore = await this.gluedogInfoEntity.findOne();
    console.log("gluedogInfoStore", gluedogInfoStore);
    console.log("检查并重置token时间");

    if (!gluedogInfoStore) {
      // 未完成初始化gluedog连接
      console.log("未完成初始化gluedog连接");
      return false;
    } else {
      // 直接刷新token，过期刷新、未过期也刷新
      return await this.handleStoreAccessToken(gluedogInfoStore.refreshToken);

      // const { expiresIn, created_at } = gluedogInfoStore;
      // const expireTime =
      //   (new Date().getTime() - new Date(created_at).getTime()) / 1000;
      // if (expireTime > expiresIn) {
      //   // 已过期，刷新token  this.handleGetGluedogInfo({});
      //   return await this.handleStoreAccessToken(gluedogInfoStore.refreshToken);
      // } else {
      //   // 未过期，刷新token
      //   return await this.handleStoreAccessToken(gluedogInfoStore.refreshToken);
      // }
    }
  }

  // 完成初始化，获取branches
  async handleGluedogFinishConnect(body) {
    if (body?.data?.branches) {
      const newBranches = [];
      for (let i = 0; i < body.data.branches.length; i++) {
        const branch = body.data.branches[i];
        const existBranch = await this.gluedogBrancheEntity.find({
          id: branch.id,
        });
        if (!existBranch.length) {
          newBranches.push(branch);
        }
      }

      // 模拟branch的companyId
      // newBranches.forEach((i, index) => {
      //   i.companyId = "658c0eaf4f133672cbe1" + (index + "").padStart(4, "0");
      // });
      // console.log("newBranches", newBranches);
      await this.gluedogBrancheEntity.insertMany(newBranches);
      return {
        status: "CONNECTED",
      };
    } else {
      return {
        status: "UPDATED",
      };
    }
  }

  // 定时推送任务
  @Cron("5 * * * * *")
  async handlePostGluedogInfo() {
    const hasToken = await this.handleCheckGluedogToken();
    if (!hasToken) return;
    const gluedogInfoStore = await this.gluedogInfoEntity.findOne();
    const gluedogConfig = getGluedogConfig();

    if (gluedogInfoStore) {
      const branches = await this.gluedogBrancheEntity.find();
      // console.log(branches);
      branches.forEach(async (branch) => {
        // 查出每个branch对应companyId，将对应的guest推过去，并保存对应的断点信息
        // console.log(branch);
        const branchGuest = await this.guestInfo
          .find({
            company: branch.companyId,
            created_at: { $gt: branch.push_gule_at },
          })
          .limit(100) // 测试每分钟推送100条
          .sort({ created_at: 1 });

        // console.log(branchGuest.length);
        for (let i = 0; i < branchGuest.length; i++) {
          const item = branchGuest[i];
          const re = this.httpService.post(
            gluedogConfig.pushGuestURL,
            {
              branchId: branch.id,
              contact: {
                name: {
                  title: "",
                  firstName: item.first_name,
                  middleName: "",
                  lastName: item.last_name,
                },
                emailAddress: item.email,
                phoneNumber: item.phone,
              },
              type: "tenant",
              listingId: "",
              source: {
                useSupplierNameAsSource: true,
                type: "direct_mail",
              },
              notes: "",
            },
            {
              headers: {
                "x-api-version": "1.0.0",
                Authorization: `Bearer ${gluedogInfoStore.accessToken}`,
              },
            }
          );
          const checkResult = await (await lastValueFrom(re)).data;

          console.log("checkResult", checkResult);
          branch.push_gule_at = item.created_at;
          await branch.save();
        }
      });
    }
  }

  // 初始化mock guleInfo
  // @Cron("5 * * * * *")
  // async handleInsertMockGuestData() {
  //   console.log("handleInsertMockGuestData --------");
  //   for (let i = 101; i < 500; i++) {
  //     const j = i > 300 ? 1 : 0;
  //     const guestInfo = new this.guestInfo({
  //       _id: "659e812ad59b931c0c9e" + (i + "").padStart(4, "0"),
  //       company: "658c0eaf4f133672cbe1" + (j + "").padStart(4, "0"),
  //       first_name: "j2" + i,
  //       last_name: "test_last_name" + i,
  //       email: i + "j2@sinaaaaa.com",
  //       phone: "+44394980" + (i + "").padStart(4, "0"),
  //       clicking_book_viewing: 0,
  //       book_viewing_successfully: 0,
  //       business_scenes: "letting",
  //     });
  //     await guestInfo.save();
  //   }
  // }
}
