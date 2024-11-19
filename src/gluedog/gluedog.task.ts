import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  GluedogBranches,
  GluedogInfo,
  Guest,
  GuestInfoSchemaDocument,
} from "./gluedog.model";
import { HttpService } from "@nestjs/axios";
import { Cron } from "@nestjs/schedule";

import { lastValueFrom } from "rxjs";
import { getGluedogConfig } from "./config";
import { GluedogService } from "./gluedog.service";

@Injectable()
export class GluedogTask {
  constructor(
    @InjectModel(GluedogInfo.name)
    private readonly gluedogInfoEntity: Model<GluedogInfo>,
    @InjectModel(Guest.name)
    private readonly guestInfo: Model<GuestInfoSchemaDocument>,
    @InjectModel(GluedogBranches.name)
    private readonly gluedogBrancheEntity: Model<GluedogBranches>,
    private readonly glueDogService: GluedogService,
    private readonly httpService: HttpService
  ) {
    // private readonly callingModel: Model<Calling>, // @InjectModel(Calling.name)
  }

  // gluedog.task.ts

  // 定时推送任务
  @Cron("5 * * * * *")
  async handlePostGluedogInfo() {
    console.log("handlePostGluedogInfo ------- *****");
    const hasToken = await this.glueDogService.handleCheckGluedogToken();
    if (!hasToken) return;
    const gluedogInfoStore = await this.gluedogInfoEntity.findOne();
    const gluedogConfig = getGluedogConfig();

    if (gluedogInfoStore) {
      const branches = await this.gluedogBrancheEntity.find();
      // console.log(branches);
      branches.forEach(async (branch) => {
        // 查出每个branch对应companyId，将对应的guest推过去，并保存对应的断点信息
        // console.log(branch);
        if (!branch.company) return;
        const branchGuest = await this.guestInfo
          .find({
            company: branch.company,
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
