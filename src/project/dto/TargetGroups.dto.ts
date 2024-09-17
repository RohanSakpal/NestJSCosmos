import { CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('TGId')
export class TargetGroups {
    TGId: string;
    TGName: string;
    ProjId: string;
    AudioName: string;
    Country: string;
    State: string;
    AgeGrp: string;
    CompetetionProduct: string[];
    MaricoProduct: string[];
    MainLang: string;
    SecondaryLang: string[];
    noOfSpek: number;
    filePath: string;
  }